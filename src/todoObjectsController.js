function getCompletedTodoList(todoArray){
    const completedArray = todoArray.filter(todoObject => todoObject.status);
    return completedArray;
}

function sortTodoListPriority(todoArray){
    const sortedArray = todoArray.sort((todoA, todoB) => todoA.priority - todoB.priority);
    return sortedArray;
};

function getUnfinishedTodoList(todoArray){
    const completedArray = todoArray.filter(todoObject => !(todoObject.status));
    return completedArray;
}

function addTodoObject(todoObject,todoArray){
    todoArray.push(todoObject)
    return todoArray;
}

function deleteTodoObject(todoArray,objectPosition){
    return todoArray.splice(objectPosition,1);
}


export {getCompletedTodoList,getUnfinishedTodoList,addTodoObject,deleteTodoObject};