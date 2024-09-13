$(document).ready(function() {
    const todoList = getCookie('todoList');
    if (todoList) {
        const todos = JSON.parse(todoList);
        todos.forEach(todo => addTodoItem(todo));
    }
});

function newTodo() {
    const task = prompt('Enter a new task:');
    if (task) {
        addTodoItem(task);
        saveTodoList();
    }
}

function addTodoItem(task) {
    const $todoDiv = $('<div></div>', {
        class: 'todo-item',
        text: task
    }).click(function() {
        if (confirm('Do you want to remove this task?')) {
            $(this).remove();
            saveTodoList();
        }
    });
    $('#ft_list').prepend($todoDiv);
}

function saveTodoList() {
    const todos = [];
    $('.todo-item').each(function() {
        todos.push($(this).text());
    });
    setCookie('todoList', JSON.stringify(todos), 7);
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

function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
