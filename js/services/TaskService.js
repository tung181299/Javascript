function TaskService() {}
TaskService.prototype.getTasksAPI = function(){
    return axios({
        url:'https://60e024146b689e001788c90a.mockapi.io/ToDoList',
        method:'GET',
    })
}
TaskService.prototype.addTasksAPI = function(){
    return axios({
        url:'https://60e024146b689e001788c90a.mockapi.io/ToDoList',
        method:'POST',
    })
}
TaskService.prototype.getTasksById = function(){
    return axios({
        url:`https://60e024146b689e001788c90a.mockapi.io/ToDoList/${id}`,
        method:'GET',
    })
}
TaskService.prototype.deleteTasksAPI = function(){
    return axios({
        url:`https://60e024146b689e001788c90a.mockapi.io/ToDoList/${id}`,
        method:'DELETE',
    })
}