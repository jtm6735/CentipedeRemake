"use strict";
export{createMushroomSprites};
class character{
    constructor(x,y,fwd,speed){
            // properties
        this.x = x;
        this.y = y;
        this.fwd = fwd;
        this.speed = speed;
    }
}
    // move(){
    //     if()
    // }

class mushroom{
    constructor(x,y,radius,color){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
    }
        draw(ctx){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}


function createMushroomSprites(num,rect = {left: 0,top: 0,width: 300,height: 300},color,radius){
     let sprites = [];
     for (let i = 0; i < num; i++) {
         let mushromms= new mushroom(Math.random() * rect.width + rect.left,
                                    Math.random() * rect.height + rect.top,//make sure the mushrooms arent to low
                                    radius,
                                    color);
        sprites.push(mushromms)
         } 
    return sprites;
}





