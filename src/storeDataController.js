function createObject(object){
    if(object.type === "todo"){
        return (createTodo(object.title,object.description,
            object.dueDate,object.status,object.priority,object.project)
            );
    } else if(object.type ==="checkList"){
        return (checkList.createCheckList(object.title,object.checkList,object.dueDate,
            object.priority,object.project));
    }else if(object.type ==="note"){
        return (createNote(object.title,object.noteText,object.lastModifiedDate,
            object.priority));
    }
}