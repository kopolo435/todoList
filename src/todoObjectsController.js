function getCompletedTodoList(todoArray){
    let completedArray = todoArray.filter(todoObject => todoObject.status);
    return completedArray;
}

function sortTodoListPriority(todoArray){
    const sortedArray = todoArray.sort((todoA, todoB) => todoA.priority - todoB.priority);
    return sortedArray;
};

function getUnfinishedTodoList(todoArray){
    let completedArray = todoArray.filter(todoObject => !(todoObject.status));
    completedArray = sortTodoListPriority(completedArray);
    return completedArray;
}

function addTodoObject(todoObject,todoArray){
    todoArray.push(todoObject)
    return todoArray;
}

function deleteTodoObject(todoArray,objectPosition){
    todoArray.splice(objectPosition,1)
    return todoArray;
}

function moveUpTodoObject(todoArray,objectPosition,todoObject){
    todoArray.splice((objectPosition-1),0,todoObject);
    todoArray.splice(checkDeleteObjectPosition(todoArray,objectPosition,true),1);
    return sortTodoListPriority(todoArray);
}

function moveDownTodoObject(todoArray,objectPosition,todoObject){
    todoArray.splice((objectPosition+2),0,todoObject);
    todoArray.splice((checkDeleteObjectPosition(todoArray,objectPosition,false)),1);
    return sortTodoListPriority(todoArray);
}

function checkDeleteObjectPosition(todoArray,objectPosition,operation){
    if(objectPosition === 0){
        return 0;
    }else if(objectPosition === (todoArray.length-1)){
        return objectPosition
    }else{
        if (operation){
            return objectPosition + 1;
        }else{
            return objectPosition -1;
        }
    }
}

function replaceTodoObject(todoArray,newTodo,todoPosition){
    todoArray.splice(todoPosition,1,newTodo);
    return todoArray;
}

export {getCompletedTodoList,
    getUnfinishedTodoList,
    addTodoObject,
    deleteTodoObject,
    moveUpTodoObject,
    moveDownTodoObject,
    replaceTodoObject,
    sortTodoListPriority};