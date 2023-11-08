import format from 'date-fns/format/index.js'
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
    fecha.value = format(todoObj.dueDate, "yyyy-MM-dd'");
    project.value = todoObj.project;
    priority.value = todoObj.priority;
    description.value = todoObj.description;
}

function updateNoteDisplay(noteObj,moda){
    const title = document.getElementById("updateTitle");
    const fecha = document.getElementById("updateFecha");
    const project = document.getElementById("updateProject");
    const priority = document.getElementById("updatePriority");
    const description = document.getElementById("updateInfo");
    const status = document.getElementById("updateStatus");
    checkIFShowDescription(noteObj);

    title.value = noteObj.title;
    fecha.value = format(noteObj.lastModifiedDate, "yyyy-MM-dd'");
    project.value = noteObj.project;
    priority.value = noteObj.priority;
    description.value = noteObj.noteText;
    status.value = noteObj.status;
}

function updateChecklistDisplay(checkObj,modal){
    const title = document.getElementById("updateTitle");
    const fecha = document.getElementById("updateFecha");
    const project = document.getElementById("updateProject");
    const priority = document.getElementById("updatePriority");
    checkIFShowDescription(checkObj);
    
    title.value = checkObj.title;
    fecha.value = format(checkObj.dueDate, "yyyy-MM-dd'");;
    project.value = checkObj.project;
    priority.value = checkObj.priority;
    addChecksContainer(checkObj);
}

function addChecksContainer(checkObj){
    const checkContainer = document.getElementById("updateCheckContainer");
    let checksArray = checkObj.checkList;
    checksArray.forEach((check,index)=>{
        checkContainer.appendChild(createChecksLabel(check,index));
    })
    return checkContainer
}


function createChecksLabel(checkObj,position){
    const label = document.createElement("label");
    label.setAttribute("for","check"+position);
    label.setAttribute("data-position",position);
    label.classList.add("sideLabel");

    const paragraph = document.createElement("p");
    paragraph.classList.add("checkLabel");
    paragraph.textContent = "Check: "+(position+1);

    label.appendChild(paragraph);
    label.appendChild(createCheck(checkObj,position));
    return label

}

function createCheck(checkObj,position){
    const check = document.createElement("input");
    check.setAttribute("type","text");
    check.setAttribute("name","check"+position);
    check.setAttribute("id","check"+position)
    check.setAttribute("data-position",position)
    check.classList.add("createCheck");
    check.value = checkObj.title;
    const addCheckEvent = function(e){
        if(e.target.value.length >= 3){
            const checkContainer = document.getElementById("createChecksContainer");
            checkContainer.appendChild(createChecksLabel(Number(e.target.getAttribute("data-position"))+1));
            e.target.removeEventListener("keyup",addCheckEvent);
        }
    }
    return check;
}

function checkIFShowDescription(taskObj){
    const checkContainer = document.getElementById("updateCheckContainer");
    const descriptionContainer = document.getElementById("descriptionLabel");
    const statusLabel = document.getElementById("statusLabel");
    if(taskObj.type === "checkList"){
        descriptionContainer.style.display="none";
        checkContainer.style.display="flex";
        statusLabel.style.display="none";
    }else{
        descriptionContainer.style.display="flex";
        checkContainer.style.display="none";
        statusLabel.style.display="flex"
    }
}

export default changeModalDisplay ;