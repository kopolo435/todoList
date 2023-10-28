function updateTypeForm(currentType){
    let formElementArray =[];
    if(currentType ==="todo"){
        formElementArray = createTodoDisplay();
    }else if(currentType === "note"){
        formElementArray = createNoteDisplay();
    }else if(currentType==="checkList"){
        formElementArray = createCheckListDisplay();
    }
    return formElementArray;
}

function createTodoDisplay(){
    let elementsArray = [];
    
    elementsArray.push(createTitleLabel());
    elementsArray.push(createFechaLabel());
    elementsArray.push(createProjectLabel());
    elementsArray.push(createPriotityLabel());
    elementsArray.push(createDescriptionLabel());

    return elementsArray;
}

function createNoteDisplay(){
    let elementsArray = [];
    
    elementsArray.push(createTitleLabel());
    elementsArray.push(createFechaLabel());
    elementsArray.push(createProjectLabel());
    elementsArray.push(createPriotityLabel());
    elementsArray.push(createDescriptionLabel());

    return elementsArray;
}

function createChecklistDisplay(){
    let elementsArray = [];
    
    elementsArray.push(createTitleLabel());
    elementsArray.push(createFechaLabel());
    elementsArray.push(createProjectLabel());
    elementsArray.push(createPriotityLabel());
    elementsArray.push(createChecksLabel());

    return elementsArray;
}

function createTitleLabel(){
    const label = document.createElement("label");
    label.setAttribute("for","createTitle");
    label.classList.add("topLabel");
    label.textContent = "Nombre Tarea";

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
        const title = document.createElement("input");
        title.setAttribute("type","date");
        title.setAttribute("name","fecha");
        title.setAttribute("id","createFecha");
        return title
    }
    label.appendChild(createFecha());
    return label
}

export default updateTypeForm