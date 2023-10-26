//Toma el objeto a crear y devuelve su informacion como un elemento html
function createElement(todoObj){
    let todoElement;
    if(todoObj.type ==="todo"){
        todoElement = createTodoDisplay(todoObj);
    }else if(todoObj.type === "note"){
        todoElement = createNoteDisplay(todoObj);
    }else if(todoObj.type ==="checkList"){
        todoElement = createCheckListDisplay(todoObj);
    }else{
        todoElement = createErrorDisplay();
    }
    return todoElement;
}