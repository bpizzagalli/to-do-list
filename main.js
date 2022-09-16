const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

const tasksContainer = document.getElementById('tasksContainer');

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleDateString('es', {day: 'numeric'});
    dateText.textContent = date.toLocaleDateString('es', {weekday: 'long'});
    dateMonth.textContent = date.toLocaleDateString('es', {month: 'short'});
    dateYear.textContent = date.toLocaleDateString('es', {year: 'numeric'});

}

const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    if(!value) return;
    const task=document.createElement('div');
    const taskText = document.createElement('p');
    taskText.textContent = value;
    task.classList.add('task', 'roundBorder');
    task.append(taskText);

    const buttons=document.createElement('div');
    buttons.classList.add('buttons', 'roundBorder');

    const buttonEdit=document.createElement('button');
    buttonEdit.classList.add('buttonEdit', 'roundBorder');
    buttonEdit.addEventListener('click', editarTarea);
    buttonEdit.textContent='Editar';
    

    const buttonDelete=document.createElement('button');
    buttonDelete.classList.add('buttonDelete', 'roundBorder');
    buttonDelete.addEventListener('click', botonBorrar);
    buttonDelete.textContent='Eliminar';

    buttons.append(buttonEdit, buttonDelete);

    task.addEventListener('click', changeTaskState);
    task.append(buttons);
    tasksContainer.prepend(task);
    event.target.reset();
    

}

const changeTaskState = event => {
    if(event.target.classList.contains('buttonEdit')) return;
    if(event.target.classList.contains('buttonDelete')) return;
    if(event.target.classList.contains('inputEdit')) return;
    if(event.target.tagName == 'P') return;
    event.target.classList.toggle('done');

}

const renderOrderedTasks = event => {
    const tasks = Array.from(tasksContainer.children);
    tasks.sort((a, b) => {
        if(a.classList.contains('done') && !b.classList.contains('done')) return 1;
        if(!a.classList.contains('done') && b.classList.contains('done')) return -1;
        return 0;
    });
    tasks.forEach(task => tasksContainer.append(task));
}


const botonBorrar = event => {
    
    if(event.target.classList.contains('buttonDelete')) {
        event.target.parentElement.parentElement.remove();
    }
}

const editarTarea = event => {
    
        const tarea = event.target.parentElement.previousElementSibling;
        const texto = tarea.textContent;
        tarea.innerHTML = `<input type="text" value="${texto}">`;
        const input = tarea.querySelector('input');
        input.addEventListener('change', event => {
            tarea.textContent = event.target.value;
        })
        input.classList.add('inputEdit','roundBorder');
}





setDate();


