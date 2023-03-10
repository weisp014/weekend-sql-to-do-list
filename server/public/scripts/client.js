$(document).ready(onReady());

function onReady() {
    console.log('document loaded');
    //TODO setup click listeners

    //load tasks from database on page load
    getTasks();
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
            <tr data-id=${task.id}>
            <td>
                <input type="checkbox" data-id="${task.id}" data-complete="${task.complete}">
            </td>
            <td>${task.description}</td>
            <td><button id="deleteBtn">Delete</button></td>
            </td>
            `);
        } else {
            $('#taskList').append(`
            <tr data-id=${task.id}>
            <td>
                <input type="checkbox" data-id="${task.id}" data-complete="${task.complete}" checked>
            </td>
            <td>${task.description}</td>
            <td><button id="deleteBtn">Delete</button></td>
            </td>
            `);
        }
    }
}