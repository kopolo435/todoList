import createTodo from "./todoObject.js";
import createNote from "./noteObject.js";
import * as checkList from "./checkListObject.js";
function callCreateTodo(){
    let title = document.getElementById("createTitle");
    let fecha = document.getElementById("createFecha");
    let project = document.getElementById("createProject");
    let tempProject = isProjectDefault(project.value) ? "Default" : project.value;
    let priority = document.getElementById("createPriority");
    let description = document.getElementById("createInfo");
    let todoObj = createTodo(title.value,description.value,new Date(fecha.value),priority.value,tempProject);
    let returnArray = [todoObj,todoObj.project];
    return returnArray;
}

function callCreateNote(){
    let title = document.getElementById("createTitle");
    let fecha = new Date();
    let project = document.getElementById("createProject");
    let tempProject = isProjectDefault(project.value) ? "Default" : project.value;
    let priority = document.getElementById("createPriority");
    let description = document.getElementById("createInfo");
    let todoObj = createNote(title.value,description.value,fecha,priority.value,tempProject);
    let returnArray = [todoObj,todoObj.project];
    return returnArray;
}

function callCreateChecklist(){
    let title = document.getElementById("createTitle");
    let fecha = document.getElementById("createFecha");;
    let project = document.getElementById("createProject");
    let tempProject = isProjectDefault(project.value) ? "Default" : project.value;
    let priority = document.getElementById("createPriority");
    let checksObjArray = getChecksData();
    let checklistObj = checkList.createCheckList(title.value,checksObjArray,new Date(fecha.value),priority.value,tempProject);
    let returnArray =[checklistObj,project.value];
    return returnArray ;
}

function isProjectDefault(project){
    if (!project.length){
        return true
    }
    else return false;
}

function getChecksData(){
    const checkNodelist = document.getElementsByClassName("createCheck");
    let checkStringArray = []
    let checkObjArray = []
    Array.from(checkNodelist, check =>{
        if(check.value != ""){
            checkStringArray.push(check.value);
        }
    })
    checkObjArray = checkList.createChecksArray(checkStringArray);
    return checkObjArray;
}

export {callCreateTodo,callCreateNote,callCreateChecklist};