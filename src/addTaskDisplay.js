/*Toma el type elegido en el modal de add task
Devuelve un array con los elementos que se deben agregar al form del modal*/
function updateTypeForm(currentType){
    let formElementArray =[];
    if(currentType ==="todo"){
        formElementArray = createTodoDisplay();
    }else if(currentType === "note"){
        formElementArray = createNoteDisplay();
    }else if(currentType==="checklist"){
        formElementArray = createChecklistDisplay();
    }
    return formElementArray;
}

/*Llama a la funciones que crean los inputs de un toDo devuelve un array con node elements*/
function createTodoDisplay(){
    let elementsArray = [];
    
    elementsArray.push(createTitleLabel());
    elementsArray.push(createFechaLabel());
    elementsArray.push(createProjectLabel());
    elementsArray.push(createPriorityLabel());
    elementsArray.push(createDescriptionLabel());

    return elementsArray;
}

/*Llama a las funciones que crean los inputs de un note, devuelve un array con node elements */
function createNoteDisplay(){
    let elementsArray = [];
    
    elementsArray.push(createTitleLabel());
    elementsArray.push(createProjectLabel());
    elementsArray.push(createPriorityLabel());
    elementsArray.push(createDescriptionLabel());

    return elementsArray;
}

/*Llama a las funciones que crean los inputs de un checklist, devuelve un array con node elements */
function createChecklistDisplay(){
    let elementsArray = [];
    
    elementsArray.push(createTitleLabel());
    elementsArray.push(createFechaLabel());
    elementsArray.push(createProjectLabel());
    elementsArray.push(createPriorityLabel());
    elementsArray.push(createCheckContainer());

    return elementsArray;
}

/*Crea los elementos necesarios para el input de title, devuelve un label */
function createTitleLabel(){
    const label = document.createElement("label");
    label.setAttribute("for","createTitle");
    label.classList.add("topLabel");
    label.textContent = "Titulo";

    const createTitle = ()=>{
        const title = document.createElement("input");
        title.setAttribute("type","text");
        title.setAttribute("name","title");
        title.setAttribute("id","createTitle");
        title.setAttribute("placeholder","Nombre Tarea");

        return title
    }
    label.appendChild(createTitle());
    return label;
}

/*Crea los elementos necesarios para el input de fecha, devuelve un label */
function createFechaLabel(){
    const label = document.createElement("label");
    label.setAttribute("for","createFecha");
    label.classList.add("sideLabel");
    label.textContent = "Fecha limite";

    const createFecha = ()=>{
        const fecha = document.createElement("input");
        fecha.setAttribute("type","date");
        fecha.setAttribute("name","fecha");
        fecha.setAttribute("id","createFecha");
        fecha.required = true;
        return fecha
    }
    label.appendChild(createFecha());
    return label
}

/*Crea los elementos necesarios para el input de project, devuelve un label */
function createProjectLabel(){
    const label = document.createElement("label");
    label.setAttribute("for","createProject");
    label.classList.add("topLabel");

    const createProject = ()=>{
        const project = document.createElement("input");
        project.setAttribute("type","text");
        project.setAttribute("name","project");
        project.setAttribute("id","createProject");
        project.setAttribute("placeholder","Default");
        return project
    }


    label.appendChild(createToolTip("Grupo donde se guardara la tarea","Proyecto"));
    label.appendChild(createProject());
    return label;
}

/*Crea un toolTip con clases de boostrap. title es el tip que aparece y content
el texto sobre el cual al hacer hover aparece el tip */
function createToolTip(title,content){
    const paragraph = document.createElement("p");
    paragraph.setAttribute("data-bs-toggle","tooltip");
    paragraph.setAttribute("title",title);
    paragraph.textContent = content;
    return paragraph;
}

/*Crea la label que contiene el input de prioridad, devuelve un label element */
function createPriorityLabel(){
    const label = document.createElement("label");
    label.setAttribute("for","createPriority");
    label.classList.add("sideLabel");

    const createSelect = ()=>{
        const select = document.createElement("select");
        select.setAttribute("name","priority");
        select.setAttribute("id","createPriority");
        for(let priorityNumber=1; priorityNumber<6;priorityNumber++){
            let option = document.createElement("option");
            if(priorityNumber===5){
                option.selected = true;
            }
            option.setAttribute("value",priorityNumber);
            option.textContent = priorityNumber;
            select.appendChild(option)
        }
        return select;
    }

    label.appendChild(createToolTip("La prioridad 1 es la mas alta","Prioridad"));
    label.appendChild(createSelect());
    return label;
}

/*Crea label que contiene input de descripcion. Devuelve un label element */
function createDescriptionLabel(){
    const label = document.createElement("label");
    label.setAttribute("for","createInfo");
    label.classList.add("topLabel");
    label.textContent = "Descripcion";

    const createTextInput = ()=>{
        const input = document.createElement("textarea");
        input.setAttribute("name","info");
        input.setAttribute("id","createInfo");
        input.setAttribute("cols","30");
        input.setAttribute("rows","5");
        input.setAttribute("placeholder","Agregar descripcion");
        return input;
    }
    label.appendChild(createTextInput());
    return label;
}

/*Crea contenedor que almacena los checks de una checklist, devuelve un div element */
function createCheckContainer(){
    const checkContainer = document.createElement("div");
    checkContainer.setAttribute("id","createChecksContainer");
    checkContainer.appendChild(createChecksLabel(1));
    return checkContainer
}

/*Crea label que almacena input de un check, toma como argumento la posicion en la cual se
crea el label. Devuelve un label element */
function createChecksLabel(position){
    const label = document.createElement("label");
    label.setAttribute("for","check"+position);
    label.setAttribute("data-position",position);
    label.classList.add("sideLabel");

    const paragraph = document.createElement("p");
    paragraph.classList.add("checkLabel");
    paragraph.textContent = "Check: "+position;

    label.appendChild(paragraph);
    label.appendChild(createCheck(position));
    return label

}

/*Crea el input de un check, toma la posicion en la que se esta creando. Devuelve un 
input*/
function createCheck(position){
    const check = document.createElement("input");
    check.setAttribute("type","text");
    check.setAttribute("name","check"+position);
    check.setAttribute("id","check"+position)
    check.setAttribute("data-position",position)
    check.classList.add("createCheck");

    //El evento permite crear nuevos checks dinamicamente cuando el usuario escribe en ellos
    const addCheckEvent = function(e){
        if(e.target.value.length >= 3){ //Si se han escrito mas de 3 letras se crea un input adicional
            const checkContainer = document.getElementById("createChecksContainer");
            checkContainer.appendChild(createChecksLabel(Number(e.target.getAttribute("data-position"))+1));
            e.target.removeEventListener("keyup",addCheckEvent);
        }
    }
    check.addEventListener("keyup",addCheckEvent);
    return check;
}

export default updateTypeForm