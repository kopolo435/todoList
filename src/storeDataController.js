function getStoredObjects(){
    if (storageAvailable("localStorage")) {
        if (!localStorage.getItem("categories")) {
            populateStorage();
          } else {
            return getObjects();
          }
      } else {
        // Se retorna [] para que la apliacion funcione, aunque no se podra guardar nada.
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