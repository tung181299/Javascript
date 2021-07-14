var taskService = new TaskService();
// getEle
function getEle(id) {
    return document.getElementById(id);
}
var getTasks = function () {
    taskService.getTasksAPI()
        .then(function (res) {
            renderTasks(res.data);
            setLocalStorage(res.data);
        }).catch(function (err) {
            // Error
            alert(err);
        });
};
getTasks();
var addTasks = function () {
    var taskName = getEle('newTask').value;
    var status = 'todo';
    var task = new Task(taskName, status);
    taskService.addTasksAPI(task)
        .then(function (res) {
            alert('Add Task Success');
            getTasks();
        }).catch(function (err) {
            // Error
            alert(err);
        });
}
var deleteTasks = function(taskId){
    taskService.deleteTasksAPI()
    .then(function (res) {
        alert('Delete Task Success');
        getTasks();
    }).catch(function (err) {
        // Error
        alert(err);
    });
}
var renderTaskList = function (taskList) {
    var taskToDo = '';
    var taskComplete = '';
    taskList.forEach(function (task) {
        if (task.status == 'todo') {
            taskToDo +=
                `
                <li>
                    <span>${task.taskName}</span>
                    <div class="buttons">
                        <button class = "remove" onclick = "deleteTasks('${task.taskName}')">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class = "complete" onclick = "updateStatus('${task.taskName}')">
                            <i class="far fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `;
        } else {
            taskComplete +=
                `
                <li>
                    <span>${task.taskName}</span>
                    <div class="buttons">
                        <button class = "remove" onclick = "deleteTasks('${task.taskName}')">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class = "complete" onclick = "updateStatus('${task.taskName}')">
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `
        }
    });
    getEle('todo').innerHTML = taskToDo;
    getEle('complete').innerHTML = taskComplete;
};

function updateStatus(taskId) {
    taskList.updateTask(taskId);
    renderTaskList(taskList.arr);
    setLocalStorage();
};
function setLocalStorage(listProduct) {
    localStorage.setItem('listProduct', JSON.stringify(listProduct));
}

function getLocalStorage() {
    if (localStorage.getItem('listProduct')) {
        return JSON.parse(localStorage.getItem('listProduct'));
    }
}
