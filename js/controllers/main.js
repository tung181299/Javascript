var taskService = new TaskService();
var valid = new Validation();
function getEle(id) {
    return document.getElementById(id);
}
var loader = false;
function checkLoader(){
    if(loader){
        getEle('loader').style.display = 'block';
    }
    else{
        getEle('loader').style.display = 'none';
    }
}
checkLoader();
var getTasks = function () {
    loader = true;
    checkLoader();
    taskService.getTasksAPI()
        .then(function (res) {
            renderTasks(res.data);
            setLocalStorage(res.data);
        }).catch(function (err) {
            // Error
            alert(err);
        });
};

getEle('addItem').addEventListener('click', function (){
    var taskName = getEle('newTask').value;
    var status = 'todo';
    if (!validateInput(taskName)) return;
    var task = new Task(taskName, status);
    loader = true;
    checkLoader();
    taskService.addTasksAPI(task)
        .then(function (res) {
            alert('Add Task Success');
            getTasks();
        }).catch(function (err) {
            // Error
            alert(err);
        });
})
var deleteTasks = function(taskId){
    loader = true;
    checkLoader();
    taskService.deleteTasksAPI()
    .then(function (res) {
        alert('Delete Task Success');
        getTasks();
    }).catch(function (err) {
        // Error
        alert(err);
    });
}
var renderTasks = function (taskService) {
    var taskToDo = '';
    var taskComplete = '';
    taskService.forEach(function (task) {
        if (task.status == 'todo') {
            taskToDo +=
                `
                <li>
                    <span>${task.taskName}</span>
                    <div class="buttons">
                        <button class = "remove" onclick = "deleteTasks('${task.id}')">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class = "complete" onclick = "updateStatus('${task.id}')">
                            <i class="far fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `
        } else {
            taskComplete +=
                `
                <li>
                    <span>${task.taskName}</span>
                    <div class="buttons">
                        <button class = "remove" onclick = "deleteTasks('${task.id}')">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class = "complete" onclick = "updateStatus('${task.id}')">
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
var validateInput = function (taskName) {
    var isValid = true;
    isValid &= valid.kiemTraRong(taskName, 'notiInput', 'Please Input Your Task!!') &&
        valid.kiemTraTrung(taskName, 'notiInput', 'Task Already Exists!!');
    return isValid;
};
function updateStatus(taskId) {
    loader = true;
    checkLoader();
    taskService.updateTask(taskId);
    renderTasks(taskService.arr);
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
