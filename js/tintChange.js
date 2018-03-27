export{tintScreen}

function tintScreen(ctx,canvas){
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    
    let data = imageData.data;
    let length =  data.length;
    let width = imageData.width;
    let rand=Math.floor(Math.random() * Math.floor(255));
    
    for(let i = 0; i < length; i+=4){
        data[i]=rand;
        data[i+1]=rand;
        data[i+2]=rand;
    }
    ctx.putImageData(imageData,0,0);
}