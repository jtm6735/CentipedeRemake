"use strict"
import{createMushroomSprites,createPlayerSprite,fireBullets,createCentipede} from './classes.js';
import{getMouse} from './utilities.js';
import{aabbCollision} from './collision.js';
export{init};

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const screenWidth = 600;
const screenHeight = 800;

const GameState=Object.freeze({
    START: Symbol("START"),
    MAIN: Symbol("MAIN"),
    GAMEOVER: Symbol("GAMEOVER")
});

const MyErrors = Object.freeze({
    drawHUDswitch: "Invalid value in drawHUD switch",
    mousedownSwitch:"Invalid value in mousedown switch",
    loadLevelSwitch:"Invalid value in loadlevel switch"
});

const keyboard = Object.freeze({
	SHIFT: 		16,
	SPACE: 		32,
	LEFT: 		37, 
	UP: 		38, 
	RIGHT: 		39, 
	DOWN: 		40
});

const keys = [];

let gameState = GameState.START;
let imageData;
let sprites = [];
let bullets = [];
let centipedes = [];
let currentLevel = 1;
let player;
let totalScore;
let levelScore;
let cageCount;
let margin = 50;
let rand;

let rect = {left: margin, top: margin, width: screenWidth - margin*2, height: screenHeight-margin*2}
let rectS = {left: margin, top: margin, width: screenWidth - margin*2, height: screenHeight-margin*3}


function init(argImageData){
    
    imageData = argImageData;
    loadLevel(currentLevel);
	
    for(let i=0;i<8;i++){
         centipedes.push(createCentipede(rectS,(300-(i*30)),150, .05, "images/centipedeHeadfRight.png"));
    }
   
    player = createPlayerSprite(rectS,150,150,.1,"images/centiShip.png");
     // bullets = createBullets(rectS,player.x, player.y, .3, "images/testBullets.png");
    for(let i=0;i<600;i+=20){
        for(let j=0;j<600;j+=20){
            rand = getRandom(50);
            if(rand>45){
               sprites.push(createMushroomSprites(rectS,i,j,20,20,"images/depressedMush.png")); 
            }    
        }
    }
     
    canvas.onmousedown = doMousedown;
    loop();
}

function loop(timestamp){
//
	requestAnimationFrame(loop);
//	
// draw background
    ctx.fillRect(0,0,screenWidth,screenHeight);

//	// loop through sprites
	//for (let s of sprites){
	//s.draw(ctx);
    drawHUD(ctx);
//
// }    
} // end for

function drawHUD(ctx){
    ctx.save();
   
    switch(gameState){
        case GameState.START:
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.save();
            ctx.fillStyle = "purple";
            ctx.rect(0,0,600,800);
            ctx.fill();
            ctx.restore();
            fillText(ctx,"Centipede!",screenWidth/2, screenHeight/2-200, "36pt 'Press Start 2P', cursive", "red");
            strokeText(ctx,"Centipede!",screenWidth/2, screenHeight/2-200, "36pt 'Press Start 2P', cursive", "white", 2);
            
			fillText(ctx,"Press Anywhere to Start",screenWidth/2, screenHeight/2+150, "14pt 'Press Start 2P', cursive", "blue");
            strokeText(ctx,"Press Anywhere to Start",screenWidth/2, screenHeight/2+150, "14pt 'Press Start 2P', cursive", "white",.5);
            
            fillText(ctx,"Use the arrow keys to move!",screenWidth/2, screenHeight/2+250, "14pt 'Press Start 2P', cursive", "blue");
            strokeText(ctx,"Use the arrow keys to move!",screenWidth/2, screenHeight/2+250, "14pt 'Press Start 2P', cursive", "white",.5);
            break;
            
        case GameState.MAIN:
            ctx.save();
            
            for(let s of sprites){
                s.draw(ctx);
            }
            
            ctx.restore();
            
            
            //centipede.draw(ctx);
            
            player.draw(ctx);
            ctx.save();
            for(let x of bullets){
                  x.draw(ctx);
                  x.dy=-x.speed;
                  x.update(60);
                if(x.y <= 0){
                    remove(bullets,x);
                }
            }
            ctx.restore();
            
            ctx.save();
            for(let c of centipedes){
                c.draw(ctx);
             
                c.dx = c.speed;
                console.log(c.x);
                if(c.x+c.width+c.dx >=600){
                    let reverse = new Image();
                    reverse.src ="images/centipedeHeadfLeft.png";
                    c.x =490;
                    c.y=c.y+20;
                    if(c.speed<=.12){
                       c.speed *= 1.08; 
                    }
                    
                    c.speed = -c.speed;
                    c.image =reverse;
                    console.log(c.speed);
                }
                if(c.x+c.dx<= 0){
                    let forward = new Image();
                    forward.src="images/centipedeHeadfRight.png";
                    c.x=10;
                    c.y=c.y+20;
                     if(c.speed>= -.12){
                       c.speed *= 1.08; 
                    }
                     c.speed = -c.speed;
                    c.image = forward;
                }
                if(c.y+c.height+c.dy>=800){
                    c.y= 20;
                }
                 c.update(60);
                  
            }
            for(let x of centipedes){
                for(let y of bullets){
                    if(aabbCollision(x.x,y.x,x.y,y.y,x.width,y.width,x.height,y.height)){
                        remove(bullets, y);
                        remove(centipedes, x);
                    }
                }
            }
            
            ctx.restore(); 
            player.update(60);
     
            
            
            break;
            
        case GameState.GAMEOVER:
            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.save();
            ctx.fillStyle = "purple";
            ctx.rect(0,0,600,800);
            ctx.fill();
            ctx.restore();
            fillText(ctx,"Game over!",screenWidth/2, screenHeight/2, "36pt 'Press Start 2P', cursive", "red");
            strokeText(ctx,"Game over!",screenWidth/2, screenHeight/2, "36pt 'Press Start 2P', cursive", "white", 2);
            ctx.restore();
            break;
            
        default:
            throw new Error(MyErrors.drawHUDswitch);
            
    }
    ctx.restore();
}

function loadLevel(levelNum){
    
}

function doMousedown(e){
    console.log(e);
    let mouse=getMouse(e);
    console.log('canvas coordinates: x=${mouse.x} y=${mouse.y}');
    switch(gameState){
        case GameState.START:
            currentLevel = 1;
            gameState = GameState.MAIN;
            loadLevel(currentLevel);
            console.log(gameState);
            break;
            
        case GameState.MAIN:
            gameState = GameState.GAMEOVER;
            break;
            
        case GameState.GAMEOVER:
            gameState = GameState.START;
            break;
            
        default:
            throw new Error(MyErrors.mousedownSwitch);
    }
}

window.onkeyup = (e) => {
//	console.log("keyup=" + e.keyCode);
	
	e.preventDefault();
if(keys[keyboard.DOWN]||keys[keyboard.UP]){
    player.dy=0;
}
if(keys[keyboard.LEFT]||keys[keyboard.RIGHT]){
    player.dx=0;
}
    keys[e.keyCode] = false;
};

window.onkeydown = (e)=>{
//	console.log("keydown=" + e.keyCode);
	keys[e.keyCode] = true;
	
	// checking for other keys - ex. 'p' and 'P' for pausing
	var char = String.fromCharCode(e.keyCode);
	if (keys[keyboard.DOWN]){
        player.dy=player.speed;
    }
    else if(keys[keyboard.UP]){
        player.dy=-player.speed;
    }

    if(keys[keyboard.LEFT]){
        player.dx=-player.speed;
    }
    else if(keys[keyboard.RIGHT]){
        player.dx=player.speed;
    }
		// do something
	
    if(keys[keyboard.SPACE]){
       //bullets
       // draw the bullets to the canvas
       // move the bullets up
       bullets.push(fireBullets(rectS,player.x + 70,player.y + 40, .1, "images/centiBullet.png"));
        
       console.log(bullets.length); 
    }
};

function fillText(ctx,string,x,y,css,color){
    ctx.save();
    ctx.font = css;
    ctx.fillStyle = color;
    ctx.fillText(string,x,y);
    ctx.restore();
}

function strokeText(ctx,string,x,y,css,color,lineWidth){
    ctx.save();
    ctx.font = css;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.strokeText(string,x,y);
    ctx.restore();
}

function remove(array, element){
    const item = array.indexOf(element);
    array.splice(item, 1);
}
function getRandom(max){
    return Math.floor(Math.random() * Math.floor(max));

}

