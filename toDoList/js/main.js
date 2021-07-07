var taskList = new TaskList();
var valid = new Validation();

var getEle = function (id) {
    return document.getElementById(id);
};
getEle('addItem').addEventListener('click', function () {
    var taskId = Math.random();
    var taskName = getEle('newTask').value;
    var status = 'todo';
    if (!validateInput(taskName)) return;
    var task = new Task(taskId, taskName, status);
    taskList.addTask(task);
    renderTaskList(taskList.arr);
    setLocalStorage();
});
var renderTaskList = function (taskList) {
    var content_todo = '';
    var content_completed = '';
    taskList.forEach(function (task) {
        if (task.status == 'todo') {
            content_todo +=
                `
                <li>
                    <span>${task.taskName}</span>
                    <div class="buttons">
                        <button class="remove" onclick="deleteTask('${task.taskName}')">
                            <i class="fa fa-trash-alt"></i>
                        </button>

                        <button class="complete" onclick="changeStatus('${task.taskName}')">
                            <i class="far fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `;
        } 
        else {
            content_completed +=
                `
                <li>
                    <span>${task.taskName}</span>
                    <div class="buttons">
                        <button class="remove" onclick="deleteTask('${task.taskName}')">
                            <i class="fa fa-trash-alt"></i>
                        </button>

                        <button class="complete" onclick="changeStatus('${task.taskName}')">
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `
        }
    });
    getEle('todo').innerHTML = content_todo;
    getEle('completed').innerHTML = content_completed;
};


function deleteTask(taskId) {
    taskList.deleteTask(taskId);
    renderTaskList(taskList.arr);
    setLocalStorage();
};

function changeStatus(taskId) {
    taskList.updateTask(taskId);
    renderTaskList(taskList.arr);
    setLocalStorage();
};

getLocalStorage();

var validateInput = function (taskName) {
    var isValid = true;
    isValid &= valid.kiemTraRong(taskName, 'notiInput', 'Please Input Your Task!!') &&
        valid.kiemTraTrung(taskName, 'notiInput', 'Task Already Exists!!');
    return isValid;
};



function getLocalStorage() {
    if (localStorage.getItem('taskList')) {
        taskList.arr = JSON.parse(localStorage.getItem('taskList'));
        renderTaskList(taskList.arr);
    }
};

function setLocalStorage() {
    localStorage.setItem("taskList", JSON.stringify(taskList.arr));
};