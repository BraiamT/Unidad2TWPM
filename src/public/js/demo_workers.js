
var i = 0;
function timeCount() {
    i+=5;
    postMessage(i);
    setTimeout(timeCount, 100);
}

timeCount();