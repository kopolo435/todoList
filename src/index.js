import createTodo from "./todoObject.js";
import * as todoObjectsController  from "./todoObjectsController.js";
import createNote from "./noteObject.js";
import * as checkList from "./checkListObject.js";
import style from "./style.css";
import testArray from "../testInput.js"
import createElement from './displayController.js'
import addTaskDisplay from './addTaskDisplay.js'

const addBtn = document.getElementById("addBtn");
const projectsContainer = document.getElementById("todoContainer");
const completedProjectsContainer = document.getElementById("completedContainer")
const taskTypeBtn = document.getElementById("selectType");
const modalForm = document.getElementById("createHeader");
const saveChangesBtn = document.getElementById("saveChanges");
const categoriesList = document.getElementById("proyectosContainer");

let currentProject = "projecto1";
let projectsCategories = getCurrentProjects(testArray);
let projectsArray = testArray;
function updateShownProjects(){
    let currentProjectArray = projectsArray.filter(task => task.project === currentProject)
    projectsContainer.replaceChildren();
    completedProjectsContainer.replaceChildren();
    currentProjectArray.forEach((taskObj,index) => {
        if(!taskObj.status){
            projectsContainer.appendChild(createElement(taskObj,index));
        }
        else{
            completedProjectsContainer.appendChild(createElement(taskObj,index));
        }
    });
}
updateShownProjects();

taskTypeBtn.addEventListener("change",e =>{
    let elementsArray = addTaskDisplay(e.target.value);
    modalForm.replaceChildren();
    elementsArray.forEach(item =>{
        modalForm.appendChild(item);
    })
})

saveChangesBtn.addEventListener("click", e=>{
    let objArray;
    if(taskTypeBtn.value === "todo"){
        objArray = callCreateTodo();
    }else if(taskTypeBtn.value === "note"){
        objArray = callCreateNote();
    }else if(taskTypeBtn.value === "checklist"){
        objArray = callCreateChecklist();
    }
    projectsArray.push(objArray[0]);
    currentProject = objArray[1];
    addNewCategory(objArray[1]);
    updateShownProjects();
    cleanAddTaskDisplay();
})

function callCreateTodo(){
    let title = document.getElementById("createTitle");
    let fecha = document.getElementById("createFecha");
    let project = document.getElementById("createProject");
    let priority = document.getElementById("createPriority");
    let description = document.getElementById("createInfo");
    let todoObj = createTodo(title.value,description.value,new Date(fecha.value),priority.value,project.value);
    let returnArray = [todoObj,todoObj.project];
    return returnArray;
}

function callCreateNote(){
    let title = document.getElementById("createTitle");
    let fecha = new Date();
    let project = document.getElementById("createProject");
    let priority = document.getElementById("createPriority");
    let description = document.getElementById("createInfo");
    let todoObj = createNote(title.value,description.value,fecha,priority.value,project.value);
    let returnArray = [todoObj,todoObj.project];
    return returnArray;
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
    console.log(projectsCategories);
    projectsCategories.forEach(project=>{
        let pElement = document.createElement("p");
        pElement.textContent = project;
        categoriesList.appendChild(pElement);
    })
}

function cleanAddTaskDisplay(){
    let elementsArray = addTaskDisplay(taskTypeBtn.value);
    modalForm.replaceChildren();
    elementsArray.forEach(item =>{
        modalForm.appendChild(item);
    })
}