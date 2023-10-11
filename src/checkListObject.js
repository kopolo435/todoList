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
        },

    }
}

const createCheckList = (title,stringListCheck,dueDate,priority,project)=>{
    const type = "checkList";
    let checkList = []
    const  createChecks = (stringListCheck)=>{
        let newCheckList = [];
        stringListCheck.forEach(element => {
            newCheckList.push(createCheck(element));
        });
        return newCheckList;
    }
    checkList = createChecks(stringListCheck);
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
            checkList = createChecks(newCheckList);
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
        updateCheckList : function(newTitle,newCheckList,newDueDate,newPriority,newProject){
            this.title = newTitle;
            this.checkList = newCheckList;
            this.dueDate = newDueDate;
            this.priority = newPriority;
            this.project = newProject;
        }
    }
}


let check1 = "barrer";
let check2 = "comer";
let check3 = "dormir";

let checkArray = [check1,check2,check3];

let checkListObject = createCheckList("tareas1",checkArray,"mañana","2","kolo");

console.log(checkListObject.checkList);
checkArray.push("jugar mucho");
checkListObject.updateCheckList("Tareas del jueves",checkArray,"mañana","1","tareas");

console.log("2")
