import * as todoObjectsController  from "./todoObjectsController.js";
import style from "./style.css"; //Se coloca para que el webpack cargue el css
import createElement from './displayController.js'
import addTaskDisplay from './addTaskDisplay.js'
import * as storage from './storeDataController.js'
import changeModalDisplay from "./updateTaskDisplay.js";
import * as taskData from "./getFormData.js";
import * as formUpdate from "./getUpdateData.js";


//Variables de elementos HTML
//Contenedor que almacena los distintos projects disponibles
const projectsContainer = document.getElementById("proyectosContainer");

//Variables globales de elementos que muestran el titulo del project actual
const projectTitle = document.getElementById("projectTItle");
const mobileProjectTitle = document.getElementById("currentProjectTitle");

//Variables globales de contenedores de elementos task
const taskContainer = document.getElementById("todoContainer");
const completedTaskContainer = document.getElementById("completedContainer")

//Variables globales de contenedores de inputs
const addTaskContainer = document.getElementById("createHeader");

//Variables globales de elementos, que tienen un evento
const addTaskForm = document.getElementById("addTask");
const updateTaskForm = document.getElementById("updateTask");
const deleteBtn = document.getElementById("deleteTask");
const taskTypeBtn = document.getElementById("selectType");

//Variables de javascript
let tasksArray = storage.getStoredTasks(); //Contiene task Obj (todo,note,checkList)
let taskId; //Variable que indica la posicion en projectsArray de un objeto
let currentProject = "Default";  //Indica el project del cual se ven sus task
let projectsCategories = storage.getStoredCategories(); //Contiene las distintos projects/Categorias

//Variable que indica si se debe ocultar el modal que esta siendo mostrado, se usa para ocultar
//cuando aparece el update modal al cambiar el estado de un task
let shouldHideModal = false;


//Se encarga de agregar los task al display
function updateShownTasks(){
    tasksArray = todoObjectsController.sortTodoListPriority(tasksArray);
    //Limpia contenido de containers
    taskContainer.replaceChildren();
    completedTaskContainer.replaceChildren();
    //Modifica titulo actual mostrado
    projectTitle.textContent = currentProject;
    mobileProjectTitle.textContent = currentProject;

    //Dependiendo de si el project acual es Default o no, se realiza un filtro segun project
    if(currentProject != "Default"){
        tasksArray.forEach((taskObj,index) =>{
            if(taskObj.project ===currentProject){
                addTaskToContainer(taskObj,index)
            }
        })
    }else{
        tasksArray.forEach((taskObj,index) =>{
            addTaskToContainer(taskObj,index)
        })
    }
    addChangeStatusEvent();
    addChangeCheckStatus();

}

//Agrega el task indicado al container dependiendo de su status
function addTaskToContainer(taskObj,index){
    let taskCard= createElement(taskObj,index);
    if(!taskObj.status){
        addUpdateEvent(taskCard);
        taskContainer.appendChild(taskCard);
    }else{
        addUpdateEvent(taskCard);
        completedTaskContainer.appendChild(taskCard);
    }
}

//Comprueba si el project es valido, devuelve un boolean
function isProjectDefault(project){
    if (!project.length){
        return true
    }
    else return false;
}

//Añade una nueva categoria project, si el project no se encuentra ya registrado
function addNewCategory(project){
    if(projectsCategories.indexOf(project)<0){
        projectsCategories.push(project);
        updateProjects();
    }
}

//Actualiza el contenido de la lista de projects
function updateProjects(){
    projectsContainer.replaceChildren();
    projectsCategories.forEach(project=>{
        let pElement = document.createElement("p");
        pElement.textContent = project;
        pElement.addEventListener("click",changeCurrentProject);
        projectsContainer.appendChild(pElement);
    })
}

//Se encarga de modificar el project actual
function changeCurrentProject(event){
    currentProject = event.target.textContent;
    event.target.classList.add("currentProject");
    projectTitle.textContent = event.target.textContent;
    updateShownTasks();
}

//Modifica el contenido de el add task modal
function cleanAddTaskDisplay(){
    let elementsArray = addTaskDisplay(taskTypeBtn.value);
    addTaskContainer.replaceChildren();
    elementsArray.forEach(item =>{
        addTaskContainer.appendChild(item);
    })
}

//Le agrega un evento a los button que contiene las task
//Este es el evento que le permite mostrar el update modal
function addUpdateEvent(taskCard){
    taskCard.addEventListener("click", e=>{
        if (!e.target.classList.contains("todoCheck")) {
            e.stopPropagation(); // Prevent propagation to the card
            const task = e.target.closest("[data-id]");
            taskId = task.dataset.id;
            changeModalDisplay(tasksArray[taskId]);
        }
    })
}

//Agrega evento que permite cambiar el status de una nota o todo
function addChangeStatusEvent(){

    const checkBtnArray = document.getElementsByClassName("todoCheck");
    Array.from(checkBtnArray).forEach(button => {
        button.addEventListener("click", e => {
            e.stopPropagation(); // Prevent propagation to the card
            let index = e.target.closest("[data-id]").dataset.id;
            tasksArray[index].changeStatus();
            updateShownTasks();
            storage.storeData(tasksArray, projectsCategories);
            shouldHideModal = true; // Set the flag to true, para evitar se muestre el update modal
        });
    });
}

//Agrega evento que permite cambiar el status de los checks de una checklist
function addChangeCheckStatus(){
    const checkBtnArray = document.getElementsByClassName("listCheckBtn");
    Array.from(checkBtnArray).forEach(button =>{
        button.addEventListener("click",e=>{

            e.stopPropagation(); // Prevent propagation to the card
            let objIndex = e.target.closest("[data-id]").dataset.id;
            let checkIndex = e.target.closest("[data-checkid]").dataset.checkid;
            tasksArray[objIndex].changeCheckStatus(checkIndex);

            if(tasksArray[objIndex].checkList[checkIndex].status){
                let buttonSymbol = document.createElement("i");
                buttonSymbol.classList.add("fa-solid", "fa-check");
                e.target.appendChild(buttonSymbol);
            }else{
                e.target.closest("[data-checkid]").replaceChildren();
            }
            completedCheckList(objIndex,tasksArray[objIndex])
            shouldHideModal = true; // Set the flag to true, para evitar se muestre el update modal
            storage.storeData(tasksArray,projectsCategories)
        })
    })
}

//Comprueba si una checkList esta completada al tener todos sus checks como completados
//Modifica el display si cambia el estado de la checkList
function completedCheckList(objIndex,checkListObj){
    const allCompleted = checkListObj.checkList.every(check => check.status === true);
    if(allCompleted){
        tasksArray[objIndex].status = allCompleted;
        updateShownTasks();
    }else{
        tasksArray[objIndex].status = false;
        updateShownTasks();
    }
}

//Event listeners 

//Indica cuando se debe cambiar el display del add modal
taskTypeBtn.addEventListener("change",e =>{
    let elementsArray = addTaskDisplay(e.target.value);
    addTaskContainer.replaceChildren();
    elementsArray.forEach(item =>{
        addTaskContainer.appendChild(item);
    })
})

//Actualiza el objeto indicado segun el id, con la informacion dentro del updateModal
updateTaskForm.addEventListener("submit",e=>{
    let updateForm = document.getElementById("updateTask");
    let objArray;
    let updateObject;
    e.preventDefault()

    if(updateForm.getAttribute("data-type") === "todo"){
        objArray = formUpdate.updateTodo();
        updateObject = objArray[0];
        tasksArray[taskId].updateObject(updateObject.title,updateObject.description,
            updateObject.dueDate,updateObject.priority,updateObject.project,updateObject.status);

    }else if(updateForm.getAttribute("data-type") === "note"){
        objArray = formUpdate.updateNote();
        updateObject = objArray[0];
        tasksArray[taskId].updatenoteObject(updateObject.title,updateObject.noteText,
            updateObject.lastModifiedDate,updateObject.priority,updateObject.project,
            updateObject.status);

    }else if(updateForm.getAttribute("data-type")=== "checkList"){
        objArray = formUpdate.updateChecklist();
        updateObject = objArray[0];
        tasksArray[taskId].updateCheckList(updateObject.title,updateObject.checkList,
            updateObject.dueDate,updateObject.priority,updateObject.project,
            updateObject.status);
    }
    currentProject = isProjectDefault(objArray[1]) ? "Default" : objArray[1];
    addNewCategory(objArray[1]);
    updateShownTasks();
    storage.storeData(tasksArray,projectsCategories)
})

//Evento que crea el task obj cuando se ingresan los datos
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
    tasksArray.push(objArray[0]);
    currentProject = isProjectDefault(objArray[1]) ? "Default" : objArray[1];
    addNewCategory(objArray[1]);
    updateShownTasks();
    storage.storeData(tasksArray,projectsCategories)
    cleanAddTaskDisplay();
})

//Evento que permite eliminar el task obj indicado
deleteBtn.addEventListener("click",e=>{
    e.stopPropagation(); // Prevent propagation to the card
    tasksArray = todoObjectsController.deleteTodoObject(tasksArray,taskId);
    updateShownTasks();
    storage.storeData(tasksArray,projectsCategories);
    $('#updateModal').modal('hide');
})


// Use the modal show event to check and hide the modal if needed
$('#updateModal').on('shown.bs.modal', function () {
    if (shouldHideModal) {
         // This code will run when the modal is fully shown, and the flag is set to true
        $('#updateModal').modal('hide');
        shouldHideModal = false; // Reset the flag
    }
});

//Muestra los projects actuales
updateProjects();

//Siempre agrega el project Default, en el cual se muestran todos los task siempre
if(tasksArray.indexOf("Default")<0){
    projectsCategories.unshift("Default");
}

if(tasksArray.length >0){
    updateShownTasks();
}
//Inicializa el titulo del project actual, debe iniciar con Default
projectTitle.textContent = currentProject;
mobileProjectTitle.textContent = currentProject;
