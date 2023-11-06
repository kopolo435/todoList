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

function createTodoDisplay(){
    let elementsArray = [];
    
    elementsArray.push(createTitleLabel());
    elementsArray.push(createFechaLabel());
    elementsArray.push(createProjectLabel());
    elementsArray.push(createPriorityLabel());
    elementsArray.push(createDescriptionLabel());

    return elementsArray;
}

function createNoteDisplay(){
    let elementsArray = [];
    
    elementsArray.push(createTitleLabel());
    elementsArray.push(createProjectLabel());
    elementsArray.push(createPriorityLabel());
    elementsArray.push(createDescriptionLabel());

    return elementsArray;
}

function createChecklistDisplay(){
    let elementsArray = [];
    
    elementsArray.push(createTitleLabel());
    elementsArray.push(createFechaLabel());
    elementsArray.push(createProjectLabel());
    elementsArray.push(createPriorityLabel());
    elementsArray.push(createCheckContainer());

    return elementsArray;
}

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

function createToolTip(title,content){
    const paragraph = document.createElement("p");
    paragraph.setAttribute("data-bs-toggle","tooltip");
    paragraph.setAttribute("title",title);
    paragraph.textContent = content;
    return paragraph;
}

function createPriorityLabel(){
    const label = document.createElement("label");
    label.setAttribute("for","createPriority");
    label.classList.add("sideLabel");

    const createSelect = ()=>{
        const select = document.createElement("select");
        select.setAttribute("name","priority");
        select.setAttribute("id","createPriority");
        for(let i=1; i<6;i++){
            let option = document.createElement("option");
            if(i===5){
                option.selected = true;
            }
            option.setAttribute("value",i);
            option.textContent = i;
            select.appendChild(option)
        }
        return select;
    }

    label.appendChild(createToolTip("La prioridad 1 es la mas alta","Prioridad"));
    label.appendChild(createSelect());
    return label;
}

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

function createCheckContainer(){
    const checkContainer = document.createElement("div");
    checkContainer.setAttribute("id","createChecksContainer");
    checkContainer.appendChild(createChecksLabel(1));
    return checkContainer
}


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

function createCheck(position){
    const check = document.createElement("input");
    check.setAttribute("type","text");
    check.setAttribute("name","check"+position);
    check.setAttribute("id","check"+position)
    check.setAttribute("data-position",position)
    check.classList.add("createCheck");

    const addCheckEvent = function(e){
        if(e.target.value.length >= 3){
            const checkContainer = document.getElementById("createChecksContainer");
            checkContainer.appendChild(createChecksLabel(Number(e.target.getAttribute("data-position"))+1));
            e.target.removeEventListener("keyup",addCheckEvent);
        }
    }
    check.addEventListener("keyup",addCheckEvent);
    return check;
}

export default updateTypeForm