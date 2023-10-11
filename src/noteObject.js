const createNote = (title,noteText,lastModifiedDate,priority,project)=>{
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
        get project(){
            return project;
        },
        set project(newProject){
            project = newProject;
        },
        updatenoteObject: function(newTitle,newNoteText,newModifiedDate,newPriority,newProject){
            this.title = newTitle;
            this.noteText = newNoteText;
            this.lastModifiedDate = newModifiedDate;
            this.priority = newPriority;
            this.project = newProject;
        },
        get type(){
            return type;
        }
    }
}

export default createNote;
