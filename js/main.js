"use strict"
import{createMushroomSprites,createPlayerSprite,fireBullets} from './classes.js';
import{getMouse} from './utilities.js';
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
let bullet;
let currentLevel = 1;
let player;
let totalScore;
let levelScore;
let cageCount;
let margin = 50;
let rect = {left: margin, top: margin, width: screenWidth - margin*2, height: screenHeight-margin*2}
let rectS = {left: margin, top: margin, width: screenWidth - margin*2, height: screenHeight-margin*3}


function init(argImageData){
    imageData = argImageData;
    loadLevel(currentLevel);
	
  
   
    player = createPlayerSprite(rectS,150,150,.1,"images/centiShip.png");
     // bullets = createBullets(rectS,player.x, player.y, .3, "images/testBullets.png");
     sprites = sprites.concat(createMushroomSprites(10,rect,20,"red"),createMushroomSprites(10,rect,10,"green")
     );
    bullet = fireBullets(rectS,player.x + 50,player.y + 25, .1, "images/centiBullet.png");
    console.log("ping");
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
            player.draw(ctx);
            ctx.save();
            for(let x of bullets){
                  x.draw(ctx);
                  x.dy=-x.speed;
                  x.update(60);
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
       bullets.push(fireBullets(rectS,player.x + 50,player.y + 25, .1, "images/centiBullet.png"));
        
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


function drawShoot(xPos, yPos){
    
}
