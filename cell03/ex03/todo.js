// Load TODO list from cookies when the page loads
window.onload = function() {
    const todoList = getCookie('todoList');
    if (todoList) {
        const todos = JSON.parse(todoList);
        todos.forEach(todo => addTodoItem(todo));
    }
};

// Create new TODO
function newTodo() {
    const task = prompt('Enter a new task:');
    if (task) {
        addTodoItem(task);
        saveTodoList();
    }
}

// Add new TODO item to the list
function addTodoItem(task) {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo-item';
    todoDiv.textContent = task;
    todoDiv.onclick = function() {
        if (confirm('Do you want to remove this task?')) {
            todoDiv.remove();
            saveTodoList();
        }
    };
    const ftList = document.getElementById('ft_list');
    ftList.insertBefore(todoDiv, ftList.firstChild);
}

// Save the TODO list in a cookie
function saveTodoList() {
    const todos = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        todos.push(item.textContent);
    });
    setCookie('todoList', JSON.stringify(todos), 7);
}

// Set a cookie
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

// Get a cookie by name
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
