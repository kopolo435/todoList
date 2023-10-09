function getCompletedTodoList(todoArray){
    const completedArray = todoArray.filter(todoObject => todoObject.status);
    return completedArray;
}

function getUnfinishedTodoList(todoArray){
    const completedArray = todoArray.filter(todoObject => !(todoObject.status));
    return completedArray;
}

function addTodoObject(todoObject,todoArray){
    todoArray.push(todoObject)
    return todoArray;
}


export {getCompletedTodoList,getUnfinishedTodoList,addTodoObject};