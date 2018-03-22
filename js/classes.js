"use strict";
export{createMushroomSprites,createPlayerSprite};
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

class player{
    constructor(x,y,width,height,speed,image){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        //this.color=color;
        this.speed=speed;
        this.image=image;
    	// other properties
		this.dx = 0; // per second
		this.dy = 0; // per second
	}
	
	update(dt){
		this.x += this.dx * dt;
		this.y += this.dy * dt;
	}

       draw(ctx){
        ctx.save();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}


function createMushroomSprites(num,rect = {left: 0,top: 0,width: 300,height: 300},radius,color){
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

function createPlayerSprite(rect={left: 0,top: 0,width: 300,height: 300},width,height,speed,url){
    let image = new Image();
    image.src = url; 
    let ship = new player(200,500,width,height,speed,image);
    return ship;
}





