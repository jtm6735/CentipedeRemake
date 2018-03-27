"use strict";
export{createMushroomSprites,createPlayerSprite,fireBullets,createCentipede};

// The baseSprite class will act as the 
// original sprite class for all the other
// classes to be based off of.
class baseSprite{
    constructor(x,y,width,height,speed,image){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.speed=speed;
        this.image=image;

        // The dx and dy will be used
        // in order to move the given object(s)
		this.dx = 0;
		this.dy = 0;
	}
    
    // The update uses delta time in order
    // to calculate the movement of an object.
	update(dt){
		this.x += this.dx * dt;
		this.y += this.dy * dt;
	}

    // Draw will be used to draw the actual
    // sprite onto the canvas passed in.
    draw(ctx){
        ctx.save();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}

class centipede extends baseSprite{
    constructor(x,y,width,height,speed,image,faceBool){
        super(x,y,width,height,speed,image);
        this.dx = 0;
        this.dy = 0;
        this.boolValue=faceBool;
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


function createMushroomSprites(rect = {left: 0,top: 0,width: 300,height: 300},x,y,width,height,url){
    let image = new Image();
    image.src = url;
    let mushroom= new baseSprite(x,y,width,height,0,image)
    return mushroom;
}

function createPlayerSprite(rect={left: 0,top: 0,width: 300,height: 300},width,height,speed,url){
    let image = new Image();
    image.src = url; 
    let ship = new baseSprite(300,650,width,height,speed,image);
    return ship;
}

function fireBullets(rect={left: 0,top: 0,width: 300,height: 300},x,y,speed,url){
    let image = new Image();
    image.src = url; 
    let bullet = new baseSprite(x,y,10,10,speed,image);
    return bullet;
}

function createCentipede(rect={left: 0,top: 0,width: 300,height: 300}, x,y, speed, url,boolean){
        let image = new Image();
        image.src = url;
        let newCentipede = new centipede(x,y,30,20,speed,image,boolean);
        return newCentipede;
}