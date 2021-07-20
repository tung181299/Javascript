function TaskService() {}

TaskService.prototype.getTasksAPI = function(){
    return axios({
        url:'https://60e024146b689e001788c90a.mockapi.io/ToDoList',
        method:'GET',
    })
}
TaskService.prototype.addTasksAPI = function(task){
    return axios({
        url:'https://60e024146b689e001788c90a.mockapi.io/ToDoList',
        method:'POST',
        data:task,
    })
}
TaskService.prototype.getTasksById = function(id){
    return axios({
        url:`https://60e024146b689e001788c90a.mockapi.io/ToDoList/${id}`,
        method:'GET',
    })
}
TaskService.prototype.deleteTasksAPI = function(id){
    return axios({
        url:`https://60e024146b689e001788c90a.mockapi.io/ToDoList/${id}`,
        method:'DELETE',
    })
}
TaskService.prototype.updateTask = function(id, task)
{
    return axios({
        url: `https://60e024146b689e001788c90a.mockapi.io/ToDoList/${id}`,
        method: 'PUT',
        data: task,
    });
};