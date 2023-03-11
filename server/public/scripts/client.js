$(document).ready(onReady);

function onReady() {
    console.log('document loaded');
    //load tasks from database on page load
    getTasks();
    //click handlers
    addClickHandlers();
}

function addClickHandlers() {
    //submit button handler
    $('#submitBtn').on('click', addTask);
    //delete button handler
    $('#taskList').on('click', '#deleteBtn', removeTask);
    //checkbox handler
}

// TODO PUT

// POST
function addTask() {
    console.log('in addTask');
    let task = {};
    task.description = $('#taskDescription').val();

    $.ajax({
        type: 'POST',
        url: '/list',
        data: task
    }).then((response) => {
        console.log('Add task successful', response);
        getTasks();
    }).catch((error) => {
        alert('Unable to add new task. Please try again.');
    });
}

// DELETE
function removeTask() {
    console.log('in removeTask');
    const idToRemove = $(this).parent().parent().data().id;
    console.log(idToRemove);
    $.ajax({
        method: 'DELETE',
        url: `/list/${idToRemove}`
    }).then((response) => {
        console.log('Deletion complete for id:', idToRemove);
        //refresh DOM
        getTasks();
    }).catch((error) => {
        alert('Error making database deletion', error);
    })
}

// GET list of tasks from database
function getTasks() {
    console.log('inside getTasks');
    $.ajax({
        type: 'GET',
        url: '/list'
    }).then((response) => {
        console.log(response);
        //render to page
        renderTasks(response);
    }).catch((error) => {
        console.log('error in GET:', error);
    });
}

function renderTasks(list) {
    console.log('inside renderTasks');
    //clear table
    $('#taskList').empty();

    for (let task of list) {
        if (!task.complete) {
            //TODO check if complete and change how checkbox is shown
            $('#taskList').append(`
            <tr data-id=${task.id} data-complete="${task.complete}">
                <td><input id="checkboxId" type="checkbox"></td>
                <td>${task.description}</td>
                <td><button id="deleteBtn">Delete</button></td>
            </tr>
        `);
        } else {
            $('#taskList').append(`
            <tr data-id=${task.id} data-complete="${task.complete}">
                <td><input id="checkboxId" type="checkbox" checked></td>
                <td>${task.description}</td>
                <td><button id="deleteBtn">Delete</button></td>
            </tr>
        `);
        }
    }
}