import createTodo from "./todoObject.js";
import * as todoObjectsController  from "./todoObjectsController.js";
import createNote from "./noteObject.js";
import * as checkList from "./checkListObject.js";
import style from "./style.css";




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

function createChecks(stringListCheck){
  let newCheckList = [];
  stringListCheck.forEach(element => {
      newCheckList.push(checkList.createCheck(element));
  });
  return newCheckList;
}

import createElement from './displayController.js'

let addBtn = document.getElementById("addBtn");
let projectsContainer = document.getElementById("todoContainer");
projectsContainer.appendChild(createElement(note2,1));


