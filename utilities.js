export {getMouse};

function getMouse(e){
    var mouse = {};
    mouse.x = e.pageX - e.target.offsetLeft;
    mouse.y = e.pageY - e.target.offsetWidth;
    console.log("used");
    return mouse;
}