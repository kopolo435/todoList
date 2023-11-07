import createTodo from "./todoObject.js";
import * as todoObjectsController  from "./todoObjectsController.js";
import createNote from "./noteObject.js";
import * as checkList from "./checkListObject.js";
import style from "./style.css";
import testArray from "../testInput.js"
import createElement from './displayController.js'
import addTaskDisplay from './addTaskDisplay.js'
import * as storage from './storeDataController.js'
import changeModalDisplay from "./updateTaskDisplay.js";

const addBtn = document.getElementById("addBtn");
const projectsContainer = document.getElementById("todoContainer");
const completedProjectsContainer = document.getElementById("completedContainer")
const taskTypeBtn = document.getElementById("selectType");
const modalForm = document.getElementById("createHeader");
const saveChangesBtn = document.getElementById("saveChanges");
const categoriesList = document.getElementById("proyectosContainer");
const projectTitle = document.getElementById("projectTItle");
const modal = document.getElementById("exampleModal");
const clickEvent = new Event("click");
let taskId;

let currentProject = "Default";
 projectTitle.textContent = currentProject;
// let projectsCategories = getCurrentProjects(testArray);
// projectsCategories.unshift("Default");

let projectsCategories = storage.getStoredCategories();
let projectsArray = storage.getStoredTasks();

updateProjects()
if(projectsArray.length >0){
    updateShownProjects();
}

function updateShownProjects(){
    projectsArray = todoObjectsController.sortTodoListPriority(projectsArray);
    projectsContainer.replaceChildren();
    completedProjectsContainer.replaceChildren();

    if(currentProject != "Default"){
        projectsArray.forEach((taskObj,index) =>{
            if(taskObj.project ===currentProject){
                if(!taskObj.status){
                    let taskCard = createElement(taskObj,index);
                    addUpdateEvent(taskCard);
                    projectsContainer.appendChild(taskCard);
                }else{
                    let taskCard = createElement(taskObj,index);
                    addUpdateEvent(taskCard);
                    completedProjectsContainer.appendChild(taskCard);
                }
            }
        })
    }
    projectsArray.forEach((taskObj,index) =>{
        if(!taskObj.status){
            let taskCard = createElement(taskObj,index);
            addUpdateEvent(taskCard);
            projectsContainer.appendChild(taskCard);
        }else{
            let taskCard = createElement(taskObj,index);
            addUpdateEvent(taskCard);
            completedProjectsContainer.appendChild(taskCard);
        }
    })


}

taskTypeBtn.addEventListener("change",e =>{
    let elementsArray = addTaskDisplay(e.target.value);
    modalForm.replaceChildren();
    elementsArray.forEach(item =>{
        modalForm.appendChild(item);
    })
})

let form = document.getElementById("addTask");

form.addEventListener("submit",e=>{
    let objArray;
    e.preventDefault()
    if(taskTypeBtn.value === "todo"){
        objArray = callCreateTodo();
    }else if(taskTypeBtn.value === "note"){
        objArray = callCreateNote();
    }else if(taskTypeBtn.value === "checklist"){
        objArray = callCreateChecklist();
    }
    projectsArray.push(objArray[0]);
    currentProject = isProjectDefault(objArray[1]) ? "Default" : objArray[1];
    addNewCategory(objArray[1]);
    updateShownProjects();
    storage.storeData(projectsArray,projectsCategories)
    cleanAddTaskDisplay();
})

function callCreateTodo(){
    let title = document.getElementById("createTitle");
    let fecha = document.getElementById("createFecha");
    let project = document.getElementById("createProject");
    let tempProject = isProjectDefault(project.value) ? "Default" : project.value;
    let priority = document.getElementById("createPriority");
    let description = document.getElementById("createInfo");
    let todoObj = createTodo(title.value,description.value,new Date(fecha.value),priority.value,tempProject);
    let returnArray = [todoObj,todoObj.project];
    return returnArray;
}

function callCreateNote(){
    let title = document.getElementById("createTitle");
    let fecha = new Date();
    let project = document.getElementById("createProject");
    let tempProject = isProjectDefault(project.value) ? "Default" : project.value;
    let priority = document.getElementById("createPriority");
    let description = document.getElementById("createInfo");
    let todoObj = createNote(title.value,description.value,fecha,priority.value,tempProject);
    let returnArray = [todoObj,todoObj.project];
    return returnArray;
}

function callCreateChecklist(){
    let title = document.getElementById("createTitle");
    let fecha = document.getElementById("createFecha");;
    let project = document.getElementById("createProject");
    let tempProject = isProjectDefault(project.value) ? "Default" : project.value;
    let priority = document.getElementById("createPriority");
    let checksObjArray = getChecksData();
    let checklistObj = checkList.createCheckList(title.value,checksObjArray,new Date(fecha.value),priority.value,tempProject);
    let returnArray =[checklistObj,project.value];
    return returnArray ;
}

function isProjectDefault(project){
    if (!project.length){
        return true
    }
    else return false;
}

function getChecksData(){
    const checkNodelist = document.getElementsByClassName("createCheck");
    let checkStringArray = []
    let checkObjArray = []
    Array.from(checkNodelist, check =>{
        if(check.value != ""){
            checkStringArray.push(check.value);
        }
    })
    checkObjArray = checkList.createChecksArray(checkStringArray);
    return checkObjArray;
}

function getCurrentProjects(objetsArray){
    let projects = objetsArray.map(item => item.project)
    const uniqueProjects = (value, index, array)=>{
        return array.indexOf(value) === index;
    }
    return projects.filter(uniqueProjects)
}

function addNewCategory(project){
    if(projectsCategories.indexOf(project)<0){
        projectsCategories.push(project);
        updateProjects();
    }
}

function updateProjects(){
    categoriesList.replaceChildren();
    projectsCategories.forEach(project=>{
        let pElement = document.createElement("p");
        pElement.textContent = project;
        pElement.addEventListener("click",changeCurrentProject);
        categoriesList.appendChild(pElement);
    })
}
function changeCurrentProject(event){
    currentProject = event.target.textContent;
    event.target.classList.add("currentProject");
    projectTitle.textContent = event.target.textContent;
    updateShownProjects();
}

function cleanAddTaskDisplay(){
    let elementsArray = addTaskDisplay(taskTypeBtn.value);
    modalForm.replaceChildren();
    elementsArray.forEach(item =>{
        modalForm.appendChild(item);
    })
}

function addUpdateEvent(taskCard){
    taskCard.addEventListener("click", e=>{
        const task = e.target.closest("[data-id]");
        taskId = task.dataset.id;
        changeModalDisplay(projectsArray[taskId],modal);
    })
}