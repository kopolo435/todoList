import format from 'date-fns/format/index.js'

/*todo es un objeto que almacena informacion de una todo.
_title es su titulo
_description es el texto de la note
_dueDate es un date obj de la fecha limite del task
priority la string de un numero (1 a 5),
project la categoria a la que pertenece la note
status indica si la nota fue completada o no*/
const createTodo = (_title,_description,_dueDate,_priority,_project,_status=false)=>{
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
        updateObject : (newTitle,newDescription,newDueDate,newPriority,newProject,status)=>{
            _title = newTitle;
            _description = newDescription;
            _dueDate = newDueDate;
            _priority = newPriority;
            _project = newProject;
            _status = status;
        },
        get type(){
             return type;
        },
        getFormatedDate : function(){
            //Devuelve la fecha como un string en formato dd/mm/aa
            return format(_dueDate,"P");
        }
    }
}
export default createTodo;