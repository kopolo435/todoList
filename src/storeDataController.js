import createTodo from "./todoObject.js";
import * as checkList from "./checkListObject.js";
import createNote from "./noteObject.js";
function getStoredTasks(){
    if (storageAvailable("localStorage")) {
        if (!localStorage.getItem("categories")) {
            populateStorage();
          } else {
            return getTasks();
          }
      } else {
        // Se retorna [] para que la aplicacion funcione, aunque no se podra guardar nada.
        return []
      }
      
}

/*Agrega categoria inicial cuando se usa por primera vez*/
function populateStorage(){
    localStorage.setItem("taskList",JSON.stringify([]));
    localStorage.setItem("categories",JSON.stringify(["Default"]));
}

function getStoredCategories(){
    if (storageAvailable("localStorage")) {
        if (!localStorage.getItem("categories")) {
            populateStorage();
            return JSON.parse(localStorage.getItem("categories"))
          } else {
            return JSON.parse(localStorage.getItem("categories"));
          }
      } else {
        // Se retorna [] para que la aplicacion funcione, aunque no se podra guardar nada.
        return []
      }
}



/*Comprueba si localstorage esta soportado y disponible en el browser*/
function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

/*Retorna array con objetos con data y metodos listo para usarse*/
function getTasks(){
    let tasksDataListArray = JSON.parse(localStorage.getItem("taskList"));
    let tasksObjectsList = [];
    tasksDataListArray.forEach(task => {
        tasksObjectsList.push(createObject(task));
    });
    return tasksObjectsList;
}

/*Almacena en el local storage toda la informacion guardada en la sesion*/
function storeData(tasksArray,categoriesArray){
    let actualCategories = tasksArray.map(obj => obj.project);
    let unique = actualCategories.filter(onlyUnique);
    if (storageAvailable("localStorage")) {
        localStorage.setItem("taskList",JSON.stringify(tasksArray));
        localStorage.setItem("categories",JSON.stringify(unique));
    } 
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}


  
/*Crea los objetos con la informacion dada para añadirle los metodos*/
function createObject(object){
    if(object.type === "todo"){
        return (createTodo(object.title,object.description,
            new Date(object.dueDate),object.priority,object.project,object.status)
            );
    } else if(object.type ==="checkList"){
        let checkListChecks = createChecks(object.checkList);
        return (checkList.createCheckList(object.title,checkListChecks,new Date(object.dueDate),
            object.priority,object.project,object.status));
    }else if(object.type ==="note"){
        return (createNote(object.title,object.noteText,new Date(object.lastModifiedDate),
            object.priority,object.project,object.status));
    }
}

function createChecks(checkObjs){
    let checkArray = []
    checkObjs.forEach(check =>{
        checkArray.push(checkList.createCheck(check.title,check.status));
    })
    return checkArray;
}

export {getStoredCategories,getStoredTasks,storeData};