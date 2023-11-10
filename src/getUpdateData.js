import createTodo from "./todoObject.js";
import createNote from "./noteObject.js";
import * as checkList from "./checkListObject.js";

/*Obtiene la la nueva informacion del update modal, crea un obj para almacenarla
Devuelve un array con el todoObj y el project al cual pertenece*/
function updateTodo(){
    let title = document.getElementById("updateTitle").value;
    let fecha = document.getElementById("updateFecha").value;
    let project = document.getElementById("updateProject").value;
    let tempProject = isProjectDefault(project) ? "Default" : project;
    let priority = document.getElementById("updatePriority").value;
    let description = document.getElementById("updateInfo").value;
    let status = document.getElementById("updateStatus")==="true" ? true : false; 
    let todoObj = createTodo(title,description,new Date(fecha),priority,tempProject,status);
    let returnArray = [todoObj,project];
    return returnArray;
}

/*Obtiene la la nueva informacion del update modal, crea un obj para almacenarla
Devuelve un array con el noteObj y el project al cual pertenece*/
function updateNote(){
    let title = document.getElementById("updateTitle").value;
    let fecha = new Date();
    let project = document.getElementById("updateProject").value;
    let tempProject = isProjectDefault(project) ? "Default" : project;
    let priority = document.getElementById("updatePriority").value;
    let description = document.getElementById("updateInfo").value;
    let status = document.getElementById("updateStatus")==="true" ? true : false; 
    let noteObj = createNote(title,description,new Date(fecha),priority,tempProject,status);
    let returnArray = [noteObj,project];
    return returnArray;
}

/*Obtiene la la nueva informacion del update modal, crea un obj para almacenarla
Devuelve un array con el noteObj y el project al cual pertenece*/
function updateChecklist(){
    let title = document.getElementById("updateTitle").value;
    let fecha = document.getElementById("updateFecha").value;
    let project = document.getElementById("updateProject").value;
    let tempProject = isProjectDefault(project) ? "Default" : project;
    let priority = document.getElementById("updatePriority").value;
    let status = document.getElementById("updateStatus")==="true" ? true : false; 
    let checksObjArray = getChecksData();
    let checklistObj = checkList.createCheckList(title,checksObjArray,new Date(fecha),priority,tempProject);
    let returnArray =[checklistObj,project];
    return returnArray ;
}

/*Toma como argumento una string del project de un obj y comprueba si esta vacia
Devuelve un boolean */
function isProjectDefault(project){
    if (!project.length){
        return true
    }
    else return false;
}

/*Obtiene los datos actualizados de los checks inputs, retorna un array de check obj*/
function getChecksData(){
    const updateForm = document.getElementById("updateTask");
    const checkNodelist = updateForm.getElementsByClassName("createCheck");
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

export {updateTodo,updateNote,updateChecklist};