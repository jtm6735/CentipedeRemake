"use strict"
import{createMushroomSprites} from './classes.js';
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

let gameState = GameState.START;
let imageData;
let sprites = [];
let currentLevel = 1;
let totalScore;
let levelScore;
let cageCount;


function init(argImageData){
    imageData = argImageData;
    loadLevel(currentLevel);
	let margin = 50;
    let rect = {left: margin, top: margin, width: screenWidth - margin*2, height: screenHeight-margin*2}
    let rectS = {left: margin, top: margin, width: screenWidth - margin*2, height: screenHeight-margin*3}
     sprites = sprites.concat(createMushroomSprites(10,rect,"red",20),createMushroomSprites(10,rect,"green",10)
     
     );
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
            ctx.save();
            for(let s of sprites){
                s.draw(ctx);
            }
            ctx.restore();
            break;
            
        case GameState.MAIN:
            
            break;
            
        case GameState.GAMEOVER:
            ctx.save();
            ctx.fillStyle = "red";
            ctx.rect(200,300,100,100);
            ctx.fill();
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