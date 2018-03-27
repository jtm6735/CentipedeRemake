export {getMouse,getRandom};

function getMouse(e){
    var mouse = {};
    mouse.x = e.pageX - e.target.offsetLeft;
    mouse.y = e.pageY - e.target.offsetWidth;
    console.log("used");
    return mouse;
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}
//function findDeltaTime(timeStamp){
//    delta=timeStamp-lastTime
//    delta
//}