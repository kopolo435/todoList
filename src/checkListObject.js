import format from 'date-fns/format/index.js'
/*Check son las tareas individuales dentro de un checkList title contiene
 el titulo de la tarea y status indica si ya completo */
const createCheck = (title,status=false)=>{
    const type = "listCheck";
    return{
        get title(){
            return title;
        },
        set title(newTitle){
            title = newTitle;
        },
        get type(){
            return type;
        },
        get status(){
            return status;
        },
        changeStatus : ()=>{
            status = status ? false:true;
        }

    }
}

/*CheckList es el objeto que almacena distintos checks. title es su titulo
checkList es un array que contiene los distintos objectos checks. 
dueDate un date obj
priority la string de un numero (1 a 5),
project la categoria a la que pertenece la checklist,
status indica si ya fueron completadas todos los checks, status depende del estado de los checks */
const createCheckList = (title,checkList,dueDate,priority,project,status=false)=>{
    const type = "checkList";
    
    return{
        get title(){
            return title;
        },
        set title(newTitle){
            title = newTitle;
        },
        get checkList(){
            return checkList;
        },
        set checkList(newCheckList){
            checkList = newCheckList;
        },
        get dueDate(){
            return dueDate;
        },
        set dueDate(newDueDate){
            dueDate = newDueDate;
        },
        get priority(){
            return priority;
        },
        set priority(newPriority){
            priority = newPriority;
        },
        get project(){
            return project;
        },
        set project(newProject){
            project = newProject;
        },
        get type(){
            return type;
        },
        get status(){
            return status;
        },
        set status(newStatus){
            status = newStatus;
        },
        updateCheckList : function(newTitle,newCheckList,newDueDate,newPriority,newProject){
            this.title = newTitle;
            this.checkList = newCheckList;
            this.dueDate = newDueDate;
            this.priority = newPriority;
            this.project = newProject;
        },
        deleteCheck : function(checkPosition){
            this.checkList.splice(checkPosition,1);
        },
        changeCheckStatus : function(checkPosition){
            this.checkList[checkPosition].changeStatus();
        },
        changeCheckTitle : function(checkPosition,newTitle){
            this.checkList[checkPosition].title = newTitle;
        },
        getFormatedDate : function(){

            return format(dueDate,"P");
        },
        updateStatus : function(){ //El status de un checklist, depende del status de sus checks
            let newStatus = true;
            this.checkList.forEach(check => {
                if (!(check.status)){
                    newStatus = false;
                }
            });
            this.status = newStatus;
        }
    }
}

/*Crea un array de checks Obj. Toma como argumento un array de string que contienen el titulo
de los checks a crear*/
function createChecksArray(stringListCheck){
    let newCheckList = [];
    stringListCheck.forEach(element => {
        newCheckList.push(createCheck(element));
    });
    return newCheckList;
  }

export {createCheck,createCheckList,createChecksArray};
