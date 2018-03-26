export {aabbCollision};

function aabbCollision(xPos, xPos2, yPos, yPos2, width, width2, height, height2){
    if(xPos < xPos2 + width2 &&
       xPos + width > xPos2 &&
       yPos < yPos2 + height2 &&
       height + yPos > yPos2){
        return true;
        console.log("collision");
    }
}