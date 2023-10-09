function getCompletedTodoList(todoArray){
    const completedArray = todoArray.filter(todoObject => todoObject.status);
    return completedArray;
}

function getUnfinishedTodoList(todoArray){
    const completedArray = todoArray.filter(todoObject => !(todoObject.status));
    return completedArray;
}


export {getCompletedTodoList,getUnfinishedTodoList};