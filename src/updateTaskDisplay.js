import format from 'date-fns/format/index.js'
/*Modulo que se encarga de modificar el aspecto del modal que muestra la informacion
de la task la cual se quiere actualizar. La creacion de los distintos elementos html
viene de la estructura con la que se creo el modal de add Task, pero en este modulo
también se le añade los values a los input */


/*Recibe el objeto que se desea actualizar, utiliza la informacion de
ese objeto para mostrar el modal con la informacion que se podra modificar*/
function changeModalDisplay(taskObj){
    const updateForm = document.getElementById("updateTask");
    if(taskObj.type === "todo"){
        updateForm.setAttribute("data-type","todo");
        updateTodoDisplay(taskObj);
    }else if(taskObj.type ==="note"){
        updateForm.setAttribute("data-type","note");
        updateNoteDisplay(taskObj);
    }else{
        updateForm.setAttribute("data-type","checkList");
        updateChecklistDisplay(taskObj);
    }
}

/*Se encarga modificar los valores del input de el updateModal con los datos de un todoObj */
function updateTodoDisplay(todoObj){
    const title = document.getElementById("updateTitle");
    const fecha = document.getElementById("updateFecha");
    const project = document.getElementById("updateProject");
    const priority = document.getElementById("updatePriority");
    const description = document.getElementById("updateInfo");

    /*Comprueba si el objeto actual tiene descripcion o checklist */
    checkIFShowDescription(todoObj);


    title.value = todoObj.title;
    fecha.value = format(todoObj.dueDate, "yyyy-MM-dd'");
    project.value = todoObj.project;
    priority.value = todoObj.priority;
    description.value = todoObj.description;
}

/*Se encarga modificar los valores del input de el updateModal con los datos de un noteObj */
function updateNoteDisplay(noteObj){
    const title = document.getElementById("updateTitle");
    const fecha = document.getElementById("updateFecha");
    const project = document.getElementById("updateProject");
    const priority = document.getElementById("updatePriority");
    const description = document.getElementById("updateInfo");
    const status = document.getElementById("updateStatus");

    /*Comprueba si el objeto actual tiene descripcion o checklist */
    checkIFShowDescription(noteObj);

    title.value = noteObj.title;
    fecha.value = format(noteObj.lastModifiedDate, "yyyy-MM-dd'");
    project.value = noteObj.project;
    priority.value = noteObj.priority;
    description.value = noteObj.noteText;
    status.value = noteObj.status;
}

/*Se encarga modificar los valores del input de el updateModal con los datos de un checkList */
function updateChecklistDisplay(checkListObj){
    const title = document.getElementById("updateTitle");
    const fecha = document.getElementById("updateFecha");
    const project = document.getElementById("updateProject");
    const priority = document.getElementById("updatePriority");

    /*Comprueba si el objeto actual tiene descripcion o checklist */
    checkIFShowDescription(checkListObj);
    
    title.value = checkListObj.title;
    fecha.value = format(checkListObj.dueDate, "yyyy-MM-dd'");;
    project.value = checkListObj.project;
    priority.value = checkListObj.priority;
    addChecksContainer(checkListObj);
}

/*Se encarga agregar los inputs de checks dentro de el div */
function addChecksContainer(checkObj){
    const checkContainer = document.getElementById("updateCheckContainer");
    let checksArray = checkObj.checkList;
    let endIndex;
    checkContainer.replaceChildren();
    checksArray.forEach((check,index)=>{
        checkContainer.appendChild(createChecksLabel(check,index));
        endIndex = index;
    })
    checkContainer.appendChild(createLastChecksLabel(endIndex+1));
    return checkContainer
}

/*Crea la label que contiene los inputs de checks */
function createChecksLabel(checkObj,position){
    const label = document.createElement("label");
    label.setAttribute("for","check"+position);
    label.setAttribute("data-position",position);
    label.classList.add("sideLabel");

    const paragraph = document.createElement("p");
    paragraph.classList.add("checkLabel");
    paragraph.textContent = "Check "+(position+1)+": ";

    label.appendChild(paragraph);
    label.appendChild(createCheck(checkObj,position));
    return label

}

/*Crea los inputs de check*/
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

/*El updateModal contiene tanto los elementos de checks container y description
Esta funcion se encarga de comprobar cual de los elementos se debe ocultar para
que se muestre el correcto segun el type del object */
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

//Funciones para crear el ultimo check input que permite añadir nuevos inputs de checks
//Crea la label que almacena el check
function createLastChecksLabel(position){
    const label = document.createElement("label");
    label.setAttribute("for","check"+position);
    label.setAttribute("data-position",position);
    label.classList.add("sideLabel");

    const paragraph = document.createElement("p");
    paragraph.classList.add("checkLabel");
    paragraph.textContent = "Check "+(position+1)+": ";

    label.appendChild(paragraph);
    label.appendChild(createLastCheck(position));
    return label

}

/*Se encarga de añadir el evento que permite añadir más checks desde el ultimo check
que aparece*/
function createLastCheck(position){
    const check = document.createElement("input");
    check.setAttribute("type","text");
    check.setAttribute("name","check"+position);
    check.setAttribute("id","check"+position);
    check.setAttribute("data-position",position)
    check.classList.add("createCheck");

    const addCheckEvent = function(e){
        if(e.target.value.length >= 3){
            const checkContainer = document.getElementById("updateCheckContainer");
            checkContainer.appendChild(createLastChecksLabel(Number(e.target.getAttribute("data-position"))+1));
            e.target.removeEventListener("keyup",addCheckEvent);
        }
    }
    check.addEventListener("keyup",addCheckEvent);
    return check;
}

export default changeModalDisplay ;