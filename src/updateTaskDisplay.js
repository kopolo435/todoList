/*Recibe el objeto que se desea actualizar, utiliza la informacion de
ese objeto para mostrar el modal con la informacion que se podra modificar*/
function changeModalDisplay(taskObj,modal){
    if(taskObj.type === "todo"){
        updateTodoDisplay(taskObj,modal);
    }else if(taskObj.type ==="note"){
        updateNoteDisplay(taskObj,modal);
    }else{
        updateChecklistDisplay(taskObj,modal);
    }
}

function updateTodoDisplay(todoObj,modal){
    const title = document.getElementById("updateTitle");
    const fecha = document.getElementById("updateFecha");
    const project = document.getElementById("updateProject");
    const priority = document.getElementById("updatePriority");
    const description = document.getElementById("updateInfo");
    checkIFShowDescription(todoObj);


    title.value = todoObj.title;
    fecha.value = todoObj.dueDate;
    project.value = todoObj.project;
    priority.value = todoObj.priority;
    description.value = todoObj.description;
}

function updateChecklistDisplay(checkObj,modal){
    checkIFShowDescription(checkObj);
    
}

function checkIFShowDescription(taskObj){
    const checkContainer = document.getElementById("updateCheckContainer");
    const descriptionContainer = document.getElementById("descriptionLabel");
    if(taskObj.type === "checkList"){
        descriptionContainer.style.display="none";
        checkContainer.style.display="flex";
    }else{
        descriptionContainer.style.display="flex";
        checkContainer.style.display="none";
    }
}

export default changeModalDisplay ;