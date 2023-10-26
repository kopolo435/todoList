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
    todoDisplay.classList.add("todo");
    todoDisplay.setAttribute("data-id",id);

    todoDisplay.appendChild(createTodoCheckBtn());
    todoDisplay.appendChild(createTodoTop());
    todoDisplay.appendChild(createTodoDescription());

    return todoDisplay;
}