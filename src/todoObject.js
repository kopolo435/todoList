import format from 'date-fns/format/index.js'
const createTodo = (_title,_description,_dueDate,_status,_priority,_project)=>{
    const type = "todo";
    return{
        set title(newTitle){
            _title = newTitle;
        },
        get title(){
            return _title;
        },
        set description(newDescription){
            _description = newDescription;
        },
        get description(){
            return _description;
        },
        set dueDate(newDueDate){
            _dueDate = newDueDate+"hola";
        },
        get dueDate(){
            return _dueDate;
        },
        set priority(newPriority){
            _priority = newPriority;
        },
        get priority(){
            return _priority;
        },
        set project(newProject){
            _project = newProject;
        },
        get project(){
            return _project;
        },
        changeStatus(){
            _status = _status ? false : true;
        },
        get status(){
            return _status;
        },
        updateObject : (newTitle,newDescription,newDueDate,newPriority,newProject)=>{
            _title = newTitle;
            _description = newDescription;
            _dueDate = newDueDate;
            _priority = newPriority;
            _project = newProject;
        },
        get type(){
             return type;
        },
        getFormatedDate : function(){

            return format(_dueDate,"P");
        }
    }
}
 export default createTodo;