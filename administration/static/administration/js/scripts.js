function renderForm(formDiv){
    let target = document.getElementById("formTarget")
    target.innerHTML = formDiv.innerHTML
}

function addChemical(){
    let template = document.getElementById("addChemicalForm")
    renderForm(template)
}