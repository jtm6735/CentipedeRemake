"use strict";
export{createMushroomSprites,createPlayerSprite,fireBullets,createCentipede};
class baseSprite{
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

class mushroom extends baseSprite{
    constructor(x,y,radius,color){
        super(x,y);
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

class player extends baseSprite{
    constructor(x,y,width,height,speed,image){
        super(x,y,width,height,speed,image);
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

class centipede extends baseSprite{
    constructor(x,y,width,height,speed,image){
        super(x,y,width,height,speed,image);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.image = image;
        this.dx = 0;
        this.dy = 0;
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

class bullets extends baseSprite{
    constructor(x,y,width,height,speed,image){
        super(x,y,width,height,speed,image);
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


function createMushroomSprites(rect = {left: 0,top: 0,width: 300,height: 300},x,y,width,height,url){
         let image = new Image();
         image.src = url;
         let mushroom= new baseSprite(x,y,width,height,0,image)
         return mushroom;
}

function createPlayerSprite(rect={left: 0,top: 0,width: 300,height: 300},width,height,speed,url){
    let image = new Image();
    image.src = url; 
    let ship = new baseSprite(200,650,width,height,speed,image);
    return ship;
}

function fireBullets(rect={left: 0,top: 0,width: 300,height: 300},x,y,speed,url){
    let image = new Image();
    image.src = url; 
    let bullet = new baseSprite(x,y,10,10,speed,image);
    return bullet;
}

function createCentipede(rect={left: 0,top: 0,width: 300,height: 300}, x,y, speed, url){
      //let centiLoop = [];
     //for (let i = 0; i < num; i++) {
        let image = new Image();
        image.src = url;
        let newCentipede = new baseSprite(x,y,80,55,speed,image);
        return newCentipede;
        //centiLoop.push(newCentipede);
     //}
    //return centiLoop;
}





