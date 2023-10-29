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

let currentProject = "projecto1";
let projectsArray = testArray;
function updateShownProjects(){
    let currentProjectArray = projectsArray.filter(task => task.project === currentProject)
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


