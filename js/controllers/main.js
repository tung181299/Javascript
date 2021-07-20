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
    loader = false;
    checkLoader();
    taskService.getTasksAPI()
        .then(function (res) {
            renderTasks(res.data);
            setLocalStorage(res.data);
        }).catch(function (err) {
            // Error
            console.log(err);
        });
};
getTasks();

var deleteTasks = function(id){
    loader = true;
    checkLoader();
    taskService.deleteTasksAPI(id)
    .then(function (res) {
        alert('Delete Task Success');
        getTasks();
    }).catch(function (err) {
        // Error
        console.log(err);
    });
}
var renderTasks = function (taskService) 
{
    var taskToDo = '';
    var taskComplete = '';
    taskService.forEach(function (task)
    {
        if(task.status == 'todo')
        {
            taskToDo +=
            `
                <li>
                    <span>${task.taskName}</span>
                    <div class="buttons">
                        <button class="remove" onclick="deleteTasks('${task.id}')">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" onclick="changeStatus('${task.id}')">
                            <i class="far fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `;
        }
        else
        {
            taskComplete += 
            `
                <li>
                    <span>${task.taskName}</span>
                    <div class="buttons">
                        <button class="remove" onclick="deleteTasks('${task.id}')">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" onclick="changeStatus('${task.id}')">
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `
        }
    });
    getEle('todo').innerHTML = taskToDo;
    getEle('completed').innerHTML = taskComplete;
};

var validateInput = function (taskName) {
    var isValid = true;
    var list = getLocalStorage();
    isValid &= valid.kiemTraRong(taskName, 'notiInput', 'Please Input Your Task!!') &&
        valid.kiemTraTrung(list, taskName, 'notiInput', 'Task Already Exists!!');
    return isValid;
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
            console.log(err);
        });
})
function changeStatus(id)
{
    loader = true;
    checkLoader();
    var list = getLocalStorage();
    var taskState = new Task;
    list.forEach(function(Task)
    {
        if(id == Task.id)
        {
            taskState.taskName = Task.taskName;
            if(Task.status == 'todo')
                taskState.status = 'completed';
            else
                taskState.status = 'todo';
        }
    })
    taskService.updateTask(id, taskState)
    .then(function(res)
    {
        alert('Update task success!!');
        getTasks();
    })
    .catch(function(err)
    {
        console.log(err);
    })
}
// function updateStatus(taskId) {
//     loader = true;
//     checkLoader();
//     taskService.updateTask(taskId);
//     renderTasks(taskService.arr);
//     setLocalStorage();
// }
function setLocalStorage(listProduct) {
    localStorage.setItem('listProduct', JSON.stringify(listProduct));
}

function getLocalStorage() {
    if (localStorage.getItem('listProduct')) {
        return JSON.parse(localStorage.getItem('listProduct'));
    }
}
