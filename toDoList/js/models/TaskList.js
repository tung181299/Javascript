function TaskList(){
    this.arr = [];
}
TaskList.prototype.findIndex = function(name)
{
    return this.arr.findIndex(function(task)
    {
        return name.toLowerCase() == task.taskName.toLowerCase();
    })
};

TaskList.prototype.addTask = function(task){
    this.arr.push(task);
}
TaskList.prototype.deleteTask = function(taskId){
    var viTri = this.findIndex(taskId);
    if(viTri !== -1){
        this.arr.splice(viTri, 1);
    }
}
TaskList.prototype.getTaskById = function(id){
    var viTri = this.timViTri(id);
    if(viTri !== -1) return this.arr[viTri];
}
TaskList.prototype.updateTask = function(taskId){
    var viTri = this.findIndex(taskId);
    if (viTri !== -1) {
        if(this.arr[viTri].status == 'todo')
            this.arr[viTri].status = 'completed';
        else
            this.arr[viTri].status = 'todo';
    };
}