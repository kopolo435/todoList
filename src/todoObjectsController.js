function getCompletedTodoList(todoArray){
    let completedArray = todoArray.filter(todoObject => todoObject.status);
    completedArray = sortTodoListPriority(completedArray);
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

function moveUpTodoObject(todoArray,objectPosition,todoObject){
    let newArray = todoArray.splice((objectPosition-1),0,todoObject);
    newArray = newArray.splice((objectPosition+1),1);
    return sortTodoListPriority(newArray);
}

export {getCompletedTodoList,getUnfinishedTodoList,addTodoObject,deleteTodoObject,moveUpTodoObject};