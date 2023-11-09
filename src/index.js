import createTodo from "./todoObject.js";
import * as todoObjectsController  from "./todoObjectsController.js";
import createNote from "./noteObject.js";
import * as checkList from "./checkListObject.js";
import style from "./style.css"; //Se coloca para que el webpack cargue el css
import createElement from './displayController.js'
import addTaskDisplay from './addTaskDisplay.js'
import * as storage from './storeDataController.js'
import changeModalDisplay from "./updateTaskDisplay.js";
import * as taskData from "./getFormData.js";
import * as formUpdate from "./getUpdateData.js";

const addBtn = document.getElementById("addBtn");
const projectsContainer = document.getElementById("todoContainer");
const completedProjectsContainer = document.getElementById("completedContainer")
const taskTypeBtn = document.getElementById("selectType");
const modalForm = document.getElementById("createHeader");
const saveChangesBtn = document.getElementById("saveChanges");
const categoriesList = document.getElementById("proyectosContainer");
const projectTitle = document.getElementById("projectTItle");
const mobileProjectTitle = document.getElementById("currentProjectTitle");
const modal = document.getElementById("exampleModal");
const addTaskForm = document.getElementById("addTask");
const updateTaskForm = document.getElementById("updateTask");

let taskId;
let currentProject = "Default";
let projectsCategories = storage.getStoredCategories();
let projectsArray = storage.getStoredTasks();

projectTitle.textContent = currentProject;
mobileProjectTitle.textContent = currentProject;


function updateShownProjects(){
    projectsArray = todoObjectsController.sortTodoListPriority(projectsArray);
    projectsContainer.replaceChildren();
    completedProjectsContainer.replaceChildren();
    projectTitle.textContent = currentProject;
    mobileProjectTitle.textContent = currentProject;
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
    }else{
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
    addChangeStatusEvent();


}

taskTypeBtn.addEventListener("change",e =>{
    let elementsArray = addTaskDisplay(e.target.value);
    modalForm.replaceChildren();
    elementsArray.forEach(item =>{
        modalForm.appendChild(item);
    })
})


updateTaskForm.addEventListener("submit",e=>{
    let updateForm = document.getElementById("updateTask");
    let objArray;
    let updateObject;
    e.preventDefault()
    if(updateForm.getAttribute("data-type") === "todo"){
        objArray = formUpdate.updateTodo();
        updateObject = objArray[0];
        projectsArray[taskId].updateObject(updateObject.title,updateObject.description,
            updateObject.dueDate,updateObject.priority,updateObject.project,updateObject.status);
    }else if(updateForm.getAttribute("data-type") === "note"){
        objArray = formUpdate.updateNote();
        updateObject = objArray[0];
        projectsArray[taskId].updatenoteObject(updateObject.title,updateObject.noteText,
            updateObject.lastModifiedDate,updateObject.priority,updateObject.project,
            updateObject.status);
    }else if(updateForm.getAttribute("data-type")=== "checkList"){
        objArray = formUpdate.updateChecklist();
        updateObject = objArray[0];
        projectsArray[taskId].updateCheckList(updateObject.title,updateObject.checkList,
            updateObject.dueDate,updateObject.priority,updateObject.project,
            updateObject.status);
    }
    currentProject = isProjectDefault(objArray[1]) ? "Default" : objArray[1];
    addNewCategory(objArray[1]);
    updateShownProjects();
    storage.storeData(projectsArray,projectsCategories)
    console.log(localStorage)
})


addTaskForm.addEventListener("submit",e=>{
    let objArray;
    e.preventDefault()
    if(taskTypeBtn.value === "todo"){
        objArray = taskData.callCreateTodo();
    }else if(taskTypeBtn.value === "note"){
        objArray = taskData.callCreateNote();
    }else if(taskTypeBtn.value === "checklist"){
        objArray = taskData.callCreateChecklist();
    }
    projectsArray.push(objArray[0]);
    currentProject = isProjectDefault(objArray[1]) ? "Default" : objArray[1];
    addNewCategory(objArray[1]);
    updateShownProjects();
    storage.storeData(projectsArray,projectsCategories)
    cleanAddTaskDisplay();
})

function isProjectDefault(project){
    if (!project.length){
        return true
    }
    else return false;
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
        if (!e.target.classList.contains("todoCheck")) {
            const task = e.target.closest("[data-id]");
            taskId = task.dataset.id;
            changeModalDisplay(projectsArray[taskId], modal);
        }
    })
}

function addChangeStatusEvent(){
    const checkBtnArray = document.getElementsByClassName("todoCheck");
    Array.from(checkBtnArray).forEach(button =>{
        button.addEventListener("click",e=>{
            e.stopPropagation(); // Prevent propagation to the card
            let index = e.target.closest("[data-id]").dataset.id;
            projectsArray[index].changeStatus();
            updateShownProjects();
            $('#updateModal').on('shown.bs.modal', function () {
                // This code will run when the modal is fully shown and ready to be hidden
                $('#updateModal').modal('hide');
            });
            
        })
    })
}

updateProjects();
if(projectsArray.length >0){
    updateShownProjects();
}