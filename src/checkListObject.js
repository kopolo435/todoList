import format from 'date-fns/format/index.js'
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
        updateStatus : function(){
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

function createChecksArray(stringListCheck){
    let newCheckList = [];
    stringListCheck.forEach(element => {
        newCheckList.push(createCheck(element));
    });
    return newCheckList;
  }

export {createCheck,createCheckList,createChecksArray};
