$(document).ready(function() {
    const todos = getAllTodoCookies();
    todos.forEach(todo => {
        
        const decodedTodo = decodeURIComponent(todo);
        addTodoItem(decodedTodo);

    });

    $('#newTodoButton').click(newTodo);
});

function newTodo() {
    const task = prompt('Enter a new task:');
    if (task) {
        addTodoItem(task); 
        saveNewTodoCookie(task); 
    }
}

function addTodoItem(task) {
    const $todoDiv = $('<div></div>').addClass('todo-item').text(task).click(function() {
        if (confirm('Do you want to remove this task?')) {
            $(this).remove();
            removeTodoCookie(task);
        }
    });

    $('#ft_list').prepend($todoDiv);
}

function saveNewTodoCookie(task) {
    const date = new Date();
    const uniqueId = date.getTime(); 
    setCookie('todo_' + uniqueId, encodeURIComponent(task), 7); 
}

function removeTodoCookie(task) {
    
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        if (decodeURIComponent(value.trim()) === task) {

            setCookie(name.trim(), '', -1);
        }
    });
}

function getAllTodoCookies() {
    const cookies = document.cookie.split(';');
    const todos = [];
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        if (name.trim().startsWith('todo_')) {
            todos.push(value.trim());
        }
    });
    return todos;
}

function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
