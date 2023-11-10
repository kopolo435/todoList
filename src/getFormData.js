import createTodo from "./todoObject.js";
import createNote from "./noteObject.js";
import * as checkList from "./checkListObject.js";

/*Se encarga de tomar los datos del form y crear un todo obj, retorna un array
con el todoObj y el proyecto al que pertenece */
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

/*Se encarga de tomar los datos del form y crear un note obj, retorna un array
con el  noteObj y el proyecto al que pertenece */
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

/*Se encarga de tomar los datos del form y crear un checkList obj, retorna un array
con el checkListObj y el proyecto al que pertenece */
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
/*Toma como argumento una string del project de un obj y comprueba si esta vacia
Devuelve un boolean */
function isProjectDefault(project){
    if (!project.length){
        return true
    }
    else return false;
}

/*Obtiene los datos de los checks inputs, retorna un array de check obj*/
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