import format from 'date-fns/format/index.js'

/*note es un objeto que almacena informacion de una note.
title es su titulo
noteText es el texto de la note
lastModifiedDate es un date obj de la ultima vez que se creo/actualizo la nota
priority la string de un numero (1 a 5),
project la categoria a la que pertenece la note
status indica si la nota fue completada o no*/
const createNote = (title,noteText,lastModifiedDate,priority,project,status=false)=>{
    const type = "note";

    return{
        get title(){
            return title
        },
        set title(newTitle){
            title = newTitle;
        },
        get noteText(){
            return noteText;
        },
        set noteText(newText){
            noteText = newText;
        },
        get lastModifiedDate(){
            return lastModifiedDate;
        },
        set lastModifiedDate(newDate){
            lastModifiedDate = newDate;
        },
        get priority(){
            return priority;
        },
        set priority(newPriority){
            priority = newPriority;
        },
        get status(){
            return status
        },
        changeStatus(){
            status = status ? false : true;
        },
        get project(){
            return project;
        },
        set project(newProject){
            project = newProject;
        },
        set status(newStatus){
            status = newStatus;
        },
        updatenoteObject: function(newTitle,newNoteText,newModifiedDate,newPriority,newProject,status){
            this.title = newTitle;
            this.noteText = newNoteText;
            this.lastModifiedDate = newModifiedDate;
            this.priority = newPriority;
            this.project = newProject;
            this.status = status;
        },
        get type(){
            return type;
        },
        getFormatedDate : function(){

            return format(lastModifiedDate,"P");
        }
    }
}

export default createNote;
