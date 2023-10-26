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

function createTodoDisplay(todoObj,id){
    let todoDisplay = document.createElement("div");
    let classColor = getPriorityColor(todoObj.priority);
    todoDisplay.classList.add("todo",classColor);
    todoDisplay.setAttribute("data-id",id);

    todoDisplay.appendChild(createTodoCheckBtn());
    todoDisplay.appendChild(createTodoTop(todoObj.title,todoObj.dueDate,todoObj.project));
    todoDisplay.appendChild(createTodoDescription(todoObj.description));

    return todoDisplay;
}

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