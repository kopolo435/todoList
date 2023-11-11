/*Llama a las funciones que crean el element que muestra la informacion del todoObj
todoObj es un objecto de tipo (todo,note,checkList), id indica su posicion respecto a otros obj
Retorna un button element*/
function createElement(todoObj,id){
    let todoElement;
    if(todoObj.type ==="todo"){
        todoElement = createTodoDisplay(todoObj,id);
    }else if(todoObj.type === "note"){
        todoElement = createNoteDisplay(todoObj,id);
    }else if(todoObj.type ==="checkList"){
        todoElement = createCheckListDisplay(todoObj,id);
    }else{
        // todoElement = createErrorDisplay();
        console.log("Error, muy grave")
    }
    return todoElement;
}

//Crea el display de un objeto de type "todo", utiiza la informacion del obj pasado
/*todoObj: obj de tipo todo, id: numero */
function createTodoDisplay(todoObj,id){
    let todoDisplay = document.createElement("button");
    let classColor = getPriorityColor(todoObj.priority);
    let statusColor = addCompletedColor(todoObj.status)
    todoDisplay.classList.add("todo",classColor,statusColor);
    todoDisplay.setAttribute("data-id",id);

    //Atributos de boostrap, para hacer uso del update modal
    todoDisplay.setAttribute("data-bs-toggle","modal");
    todoDisplay.setAttribute("data-bs-target","#updateModal");

    todoDisplay.appendChild(createTodoCheckBtn(todoObj.status));
    todoDisplay.appendChild(createTodoTop(todoObj.title,todoObj.getFormatedDate(),todoObj.project));
    todoDisplay.appendChild(createTodoDescription(todoObj.description));

    return todoDisplay;
}

/*Crea el boton que permite marcar una tarea/todo como completado 
Toma como argumento el status para decidir si marcar el simbolo de completado*/
function createTodoCheckBtn(completedStatus){
    let todoBtn = document.createElement("button");
    todoBtn.classList.add("todoCheck","btn");

    if(completedStatus){
        let buttonSymbol = document.createElement("i");
        buttonSymbol.classList.add("fa-solid", "fa-check");
        todoBtn.appendChild(buttonSymbol);
    }

    return todoBtn;
}

/*Crea el contenedor que contiene la informacion caracteristica del todo*/ 
function createTodoTop(title,date,project){
    let todoTop = document.createElement("div");
    todoTop.classList.add("todoTop");

    let topTitle = document.createElement("p");
    topTitle.classList.add("taskTitle");
    topTitle.textContent = title;

    let topDate = document.createElement("p");
    topDate.classList.add("taskDueDate");
    topDate.textContent = date;

    let topProject = document.createElement("p");
    topProject.classList.add("taskProject", "d-sm-block");
    topProject.textContent = project;

    todoTop.replaceChildren(topTitle,topDate,topProject);

    return todoTop;
}

/*Crea el elemento que muestra la descripción del todo. descripcion: string*/
function createTodoDescription(descripcion){
    let descriptionDisplay = document.createElement("p");
    descriptionDisplay.classList.add("todoDescription");
    descriptionDisplay.textContent = descripcion;

    return descriptionDisplay;
}

/*Determina determinar el color de button container del obj segun su prioridad
priority: numero del 1 a 5*/
function getPriorityColor(priority){
    let color;
    switch (priority) {
        case "1":
            color = "bg-priority1";
            break;
        case "2":
            color = "bg-priority2";
            break;
        case "3":
            color = "bg-priority3";
            break;
        case "4":
            color = "bg-priority4";
            break;
    
        default:
            color = "bg-priority5";
            break;
    }
    return color;
}

//Crea el display de un objeto de type "note", utiiza la informacion del obj pasado
/*noteObj: obj de tipo note, id: numero */
function createNoteDisplay(noteObj,id){
    let noteDisplay = document.createElement("button");
    let classColor = getPriorityColor(noteObj.priority);
    let statusColor = addCompletedColor(noteObj.status)
    noteDisplay.classList.add("note",classColor,statusColor);
    noteDisplay.setAttribute("data-id",id);

    //Atributos de boostrap, para hacer uso del update modal
    noteDisplay.setAttribute("data-bs-toggle","modal");
    noteDisplay.setAttribute("data-bs-target","#updateModal");

    noteDisplay.appendChild(createTodoCheckBtn(noteObj.status));
    noteDisplay.appendChild(createTodoTop(noteObj.title,noteObj.getFormatedDate(),noteObj.project));
    noteDisplay.appendChild(createTodoDescription(noteObj.noteText));

    return noteDisplay;
}

//Crea el display de un objeto de type "checkList", utiiza la informacion del obj pasado
/*checkListObj: obj de tipo note, id: numero */
function createCheckListDisplay(checkListObj,id){
    let checklistDisplay = document.createElement("button");
    let classColor = getPriorityColor(checkListObj.priority);
    let statusColor = addCompletedColor(checkListObj.status)
    checklistDisplay.classList.add("checkList",classColor,statusColor);
    checklistDisplay.setAttribute("data-id",id);

    //Atributos de boostrap, para hacer uso del update modal
    checklistDisplay.setAttribute("data-bs-toggle","modal");
    checklistDisplay.setAttribute("data-bs-target","#updateModal");
    
    checklistDisplay.appendChild(createTodoTop(checkListObj.title,checkListObj.getFormatedDate(),checkListObj.project));
    checklistDisplay.appendChild(createChecksContainer(checkListObj.checkList));

    return checklistDisplay;
}
/*Crear contenedor que almacena los distintos checks*/
function createChecksContainer(checksArray){
    let checksContainer = document.createElement("div");
    checksContainer.classList.add("checksContainer");
    checksArray.forEach((checkObj,index) => {
        checksContainer.appendChild(createCheck(checkObj.title,checkObj.status,index));
    });
    return checksContainer;
}

/*Crea el display de los checks, title: string, status:boolean, index:number */
function createCheck(title,status,index){
    let check  = document.createElement("div");
    check.classList.add("check");

    let miniCheckBtn = document.createElement("button");
    miniCheckBtn.setAttribute("data-checkId",index);
    miniCheckBtn.classList.add("listCheckBtn", "btn");
    if(status){
        let buttonSymbol = document.createElement("i");
        buttonSymbol.classList.add("fa-solid", "fa-check");
        miniCheckBtn.appendChild(buttonSymbol);
    }

    let checkTitle = document.createElement("p");
    checkTitle.classList.add("checkText");
    checkTitle.textContent = title;

    check.replaceChildren(miniCheckBtn,checkTitle);
    return check;
}

function addCompletedColor(status){
    if(status){
        return "completedTask"
    }
    else return "uncompletedTask"
}

export default createElement;