
function Validation() {
    this.kiemTraRong = function(value, spanId, mess) {
        if (value === '') {
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }

        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true;
    };

    this.kiemTraTrung = function(value, spanId, mess) {
        if (taskService.findIndex(value) !== -1) {
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }

        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true;
    };   
}
