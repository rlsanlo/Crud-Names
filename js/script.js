let globalNames = ['um', 'Dois', 'Tres', 'Quatro'];
let inputName = null;
let isEditing = false;
let currentIndex = null;

window.addEventListener('load', () => {
    
    inputName = document.querySelector('#inputName');
    preventFormSubmit();
    activateInput();
    render();
});


function preventFormSubmit(){
    const handleFormSubmit = (event) => {
        event.preventDefault();
    }
    let form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput(){
    const insertName = (newName) => {
        globalNames = [...globalNames, newName];
        render();
    }

    const updateName = (newName) => {
        globalNames[currentIndex] = newName;
    }

    function handleTyping(event){
        let hasText = !!event.target.value && event.target.value.trim() !== '';
        if(!hasText){
            clearInput();
            return; 
        }
        if(event.key === 'Enter'){
            if(isEditing){
                updateName(event.target.value);
            }else{
                insertName(event.target.value);
            }
            isEditing = false;
            clearInput();
            render();
        }
    }
    inputName.addEventListener('keyup', handleTyping);
    inputName.focus();
}

function render(){
    function createDeleteButton(index){
        const deleteName = () => {
            globalNames = globalNames.filter(( _, i) => i !== index);
            render();
        }

        let button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent = 'X';
        button.addEventListener('click', deleteName);
        
        return button;
    }

    function createSpan(name, index){
        const editItem = () => {
            inputName.value = name;
            inputName.focus();
            isEditing = true;
            currentIndex = index;
        }
        let span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;
        span.addEventListener('click', editItem);

        return span
    }

    let divNames = document.querySelector('#names');
    divNames.innerHTML = '';

    let ul = document.createElement('ul');

    for(let i = 0; i < globalNames.length; i++){
        let currentName = globalNames[i];

        let li = document.createElement('li');
        let button = createDeleteButton(i);
        let span = createSpan(currentName, i);

        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);
    }

    divNames.appendChild(ul);
    clearInput();

}

const clearInput = () => {
    inputName.value = '';
    inputName.focus();
}
