//gradient stuff
const colorStop_0 = document.getElementById("colorStop_0")
const colorStop_1 = document.getElementById("colorStop_1")

let color_0, color_1;

colorStop_0.addEventListener('change', ()=>{
    color_0 = colorStop_0.value
})

colorStop_1.addEventListener('change', ()=>{
    color_1 = colorStop_1.value
})

const addGradient = function(){
    ctxg.drawImage(canvass, -canvasg.width/2, -canvasg.height/2)

    //re-add gradient. Important!
    const data = ctxx.getImageData(0, 0, canvass.width, canvass.height)
    ctxg.putImageData(data, 0, 0);
    //--------------------------- 

    let angle = 45 * Math.PI / 180
    let x2 = 300 * Math.cos(angle)
    let y2 = 300 * Math.sin(angle)
    let gradient = ctxg.createLinearGradient(0, 0, x2, y2);

    gradient.addColorStop(0, `${color_0}`);
    gradient.addColorStop(1, `${color_1}`);

    ctxg.globalCompositeOperation = blendMode;

    ctxg.fillStyle = gradient;
    ctxg.globalAlpha = 0.5;
    ctxg.fillRect(-canvasg.width/2, -canvasg.height/2, ctxg.canvas.width, ctxg.canvas.height);
}


undoGradientButton.addEventListener('click', ()=>{
    ctxg.clearRect(-canvasg.width/2, -canvasg.height/2, ctxg.canvas.width, ctxg.canvas.height);
    blendingModes.value = 'none'
})

const blendingModes = document.getElementById('blending');
let gradientCount = 0
blendingModes.addEventListener('change', ()=>{
    gradientCount++;
    blendMode = blendingModes.value;
    addGradient(); 
    //if gradient layer already exists, clear it before adding new one
    let gradientGroup = document.querySelector('.gradient');
    gradientGroup ? gradientGroup.remove() : null;
    
    addLayer(canvasg, "Gradient");
    drawBrushedLayer(canvasg)
})
