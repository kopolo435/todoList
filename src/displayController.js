//Toma el objeto a crear y devuelve su informacion como un elemento html
function createElement(todoObj,id){
    let todoElement;
    if(todoObj.type ==="todo"){
        todoElement = createTodoDisplay(todoObj,id);
    }else if(todoObj.type === "note"){
        todoElement = createNoteDisplay(todoObj,id);
    }else if(todoObj.type ==="checkList"){
        todoElement = createCheckListDisplay(todoObj,id);
    }else{
        todoElement = createErrorDisplay();
    }
    return todoElement;
}

//Crea el display de un objeto de type "todo"
function createTodoDisplay(todoObj,id){
    let todoDisplay = document.createElement("div");
    let classColor = getPriorityColor(todoObj.priority);
    todoDisplay.classList.add("todo",classColor);
    todoDisplay.setAttribute("data-id",id);

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

/*Crea el elemento que muestra la descripción del todo*/
function createTodoDescription(descripcion){
    let descriptionDisplay = document.createElement("p");
    descriptionDisplay.classList.appendChild("todoDescription");
    descriptionDisplay.textContent = descripcion;

    return descriptionDisplay;
}

/*Determina la clase del elemento segun su prioridad*/
function getPriorityColor(priority){
    let color;
    switch (priority) {
        case 1:
            color = "bg-priority1";
            break;
        case 2:
            color = "bg-priority2";
            break;
        case 3:
            color = "bg-priority3";
            break;
        case 4:
            color = "bg-priority4";
            break;
    
        default:
            color = "bg-priority5";
            break;
    }
    return color;
}

/*Crea el elemento html para display de un note */
function createNoteDisplay(todoObj,id){
    let todoDisplay = document.createElement("div");
    let classColor = getPriorityColor(todoObj.priority);
    todoDisplay.classList.add("note",classColor);
    todoDisplay.setAttribute("data-id",id);

    todoDisplay.appendChild(createTodoCheckBtn(todoObj.status));
    todoDisplay.appendChild(createTodoTop(todoObj.title,todoObj.getFormatedDate(),todoObj.project));
    todoDisplay.appendChild(createTodoDescription(todoObj.description));

    return todoDisplay;
}