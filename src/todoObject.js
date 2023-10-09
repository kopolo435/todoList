const createTodo = (_title,_description,_dueDate,_status,_priority,_project)=>{
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
            _dueDate = newDueDate;
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
        }
    }
}

export default createTodo;