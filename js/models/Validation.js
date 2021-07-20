function findIndex(list, value)
{
    var index = -1;
    list.forEach(function(task)
    {
        if(task.taskName.toLowerCase() == value.toLowerCase())
            index = 0;
    })
    return index;
}

function Validation()
{
    this.kiemTraRong = function(value, spanId, mess)
    {
        if(value === '')
        {
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true;
    };

    this.kiemTraTrung = function(list, value, spanId, mess)
    {

        if(findIndex(list, value) !== -1)
        {
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true;
    };
}