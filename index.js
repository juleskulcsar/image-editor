let div = document.querySelector('.canvas-container');
let canvas = document.createElement('canvas');
canvas.classList.add('canvas');
let canvass = document.createElement('canvas');
let canvasg = document.createElement('canvas');
canvass.classList.add('.canvass');
canvasg.classList.add('.canvasg');
canvas.style.position = 'absolute'
canvass.style.position = 'absolute'
canvasg.style.position = 'absolute'
const ctx = canvas.getContext('2d');
const ctxx = canvass.getContext('2d');
const ctxg = canvasg.getContext('2d');
ctxg.globalAlpha = 0.5;
let img = new Image();

let grayscaleValue = document.getElementById('gs-value');
let blurValue = document.getElementById('blur-value');
let brightnessValue = document.getElementById('br-value');
let contrastValue = document.getElementById('contrast-value');
let hueValue = document.getElementById('hue-value');
let opacityValue = document.getElementById('opacity-value');
let invertValue = document.getElementById('invert-value');
let saturationValue = document.getElementById('saturation-value');
let sepiaValue = document.getElementById('sepia-value');
let checkRGB = document.querySelector('.rgb-split');
let checkInvert = document.querySelector('.invert-Colors');
let rgbButton = document.getElementById('rgbsplit');
let invertButton = document.getElementById('invertColors');
let resetImage = document.getElementById('reset');
let range = document.querySelectorAll('[type="range"]');
let rotateButton = document.querySelector('.rotate');
let selectImage = document.getElementById('selectImage');
let form = document.getElementById('imageEditor');
let button = document.getElementById('btn-download');
let filter = document.getElementById('filters');

let painted = true;
let pixels;
let degrees = 0;
let imgSize;

const rRange  = document.getElementById('r')
const gRange  = document.getElementById('g')
const bRange  = document.getElementById('b')
const aRange  = document.getElementById('a')
const rlRange  = document.getElementById('rl')
const glRange  = document.getElementById('gl')
const blRange  = document.getElementById('bl')
const rsRange  = document.getElementById('rs')
const gsRange  = document.getElementById('gs')
const bsRange  = document.getElementById('bs')

// let tresholdButton = document.getElementById('treshold');
let showOriginalButton = document.getElementById('showOriginal');

let painted = true;
let pixels;
let pixelss;
let degrees = 0;
let imgSize;
let imgSizee;
let srgb =[];
let hsl;

let eventLocation;
let coord;
let context;
let pixelData;
let hex;

let blendMode;

//--------------------Event Listeners-------------------//

selectImage.addEventListener('change', e => Utils.selectImg(e));

rotateButton.addEventListener('click', () => {
    degrees = (degrees + 90) % 360;
    Utils.rotate(degrees);
});

checkRGB.addEventListener('change', () => Utils.checkRgbSplit());

checkInvert.addEventListener('change', () => Utils.checkInvertColors());

range.forEach(option =>
    option.addEventListener('change', () => Utils.editImage())
);

resetImage.addEventListener('click', () => Utils.reset());

rgbButton.addEventListener('click', () => {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imageData = Filters.rgbSplit(imageData);
    ctx.globalAlpha = 0.8;
    ctx.putImageData(imageData, 0, 0);
});

invertButton.addEventListener('click', () => {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    Filters.invertColors(imageData.data);
    ctx.putImageData(imageData, 0, 0);
});

button.addEventListener('click', () => Utils.donwloadImage());

filter.addEventListener('change', () => {
    Utils.resetFilter();
    const filterToApply = filter.value;
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    switch (filterToApply) {
        case 'grayscale':
            imageData = Filters.bwEffect(imageData);
            ctx.putImageData(imageData, 0, 0);
            break;
        case 'sepia':
            imageData = Filters.sepiaEffect(imageData);
            ctx.putImageData(imageData, 0, 0);
            break;
        case 'red':
            imageData = Filters.redEffect(imageData);
            ctx.putImageData(imageData, 0, 0);
            break;
        case 'cold':
            imageData = Filters.coldEffect(imageData);
            ctx.putImageData(imageData, 0, 0);
            break;
        case 'warm':
            imageData = Filters.warmEffect(imageData);
            ctx.putImageData(imageData, 0, 0);
            break;
        case 'warmdark':
            imageData = Filters.darkWarmEffect(imageData);
            ctx.putImageData(imageData, 0, 0);
            break;
        case 'cyan':
            imageData = Filters.cyanEffect(imageData);
            ctx.putImageData(imageData, 0, 0);
            break;
        case 'yellow':
            imageData = Filters.yellowEffect(imageData);
            ctx.putImageData(imageData, 0, 0);
            break;
        case 'washedout':
            imageData = Filters.washedOutEffect(imageData);
            ctx.putImageData(imageData, 0, 0);
            break;
        default:
            draw(img);
            break;
    }
});

//--------------------End of Event Listeners-------------------//

function draw(img) {
    // const testPosition = getTextPos();
    // console.log('testPosition: ', testPosition);
    canvas.style.height = '100%';
    canvass.style.height = '100%';
    canvasg.style.height = '100%';

    canvas.width = img.height;
    canvas.height = img.width;

    canvass.width = img.height;
    canvass.height = img.width;

    canvasg.width = img.height;
    canvasg.height = img.width;

    imgSize = Utils.aspectRatio(
        img.width,
        img.height,
        canvas.width,
        canvas.height
    );

    imgSizee = Utils.aspectRatio(
    img.width,
    img.height,
    canvass.width,
    canvass.height
  );

    const centerShift_x = (canvas.width - imgSize.width) / 2;
    const centerShift_y = (canvas.height - imgSize.height) / 2;

    const centerShift_xx = (canvass.width - imgSizee.width) / 2;
    const centerShift_yy = (canvass.height - imgSizee.height) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxx.clearRect(0, 0, canvass.width, canvass.height);
    ctxg.clearRect(0, 0, canvasg.width, canvasg.height);

    // let userText = image;

    // ctx.fillStyle = userText;

    img.onload = function() {
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            imgSize.width,
            imgSize.height
        );
    };

    ctxx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_xx,
    centerShift_yy,
    imgSizee.width,
    imgSizee.height
  );

  ctxg.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_xx,
    centerShift_yy,
    imgSizee.width,
    imgSizee.height
  );
    // ctx.globalAlpha = 0.95;
    // // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.font = '40pt Calibri';
    // ctx.fillStyle = 'orange';
    // // ctx.fillText(
    // //     'My TEXT!',
    // //     centerShift_x - testPosition.x,
    // //     centerShift_y - testPosition.y
    // // );
    // ctx.fillText('My TEXT!!!!!!!!', 20, 20);
    Utils.rotate(0);
    pixels = ctx.getImageData(0, 0, imgSize.width, imgSize.height);
    pixelss = ctxx.getImageData(0, 0, imgSizee.width, imgSizee.height);
    pixelsg = ctxg.getImageData(0, 0, imgSizee.width, imgSizee.height);
}

//testing stuff
canvass.addEventListener("click", function(event){
    let eventLocation = Utils.getMousePos(canvas, event);
    let coord = "x=" + eventLocation.x + ", y=" + eventLocation.y;
    
    // Get the data of the pixel according to the location generate by the getEventLocation function
    let context = this.getContext('2d');
    let pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;

    // If transparency on the pixel , array = [0,0,0,0]
    if((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)){
        coord += " (Transparent color detected, cannot be converted to HEX)";
    }

    let hex = "#" + ("000000" + Utils.rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
    srgb = [pixelData[0], pixelData[1], pixelData[2]]
    hsl = Utils.RGBToHSL(srgb[0], srgb[1], srgb[2])

    // Draw the color and coordinates.
    document.getElementById("status").innerHTML = coord;
    document.getElementById("color").style.backgroundColor = hex;
    document.getElementById("color2").innerText =`rgb: [${srgb}]` ;
    document.getElementById("color3").innerText =`hsl( ${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` ;
    r.value = srgb[0]
    g.value = srgb[1]
    b.value = srgb[2]
    // a.value = srgb[3]
    // hsl = Utils.RGBToHSL(srgb[0], srgb[1], srgb[2])

    rgb = Utils.HSLToRGB(hsl[0], hsl[1], hsl[2])
},false);


rRange.addEventListener('click', ()=>{
    srgb[0] = parseInt(rRange.value);
})
gRange.addEventListener('click', ()=>{
    srgb[1] = parseInt(gRange.value);
})
bRange.addEventListener('click', ()=>{
    srgb[2] = parseInt(bRange.value);
})

showOriginalButton.addEventListener('mousedown', () => {
    canvass.style.position = null;
    canvasg.style.visibility = "hidden";
    canvasm.style.visibility = "hidden";
    showOriginalButton.style.background = 'orange'
  });
showOriginalButton.addEventListener('mouseup', () => {
    canvass.style.position = 'absolute';
    canvasg.style.visibility = 'visible';
    canvasm.style.visibility = 'visible';
    showOriginalButton.style.background = '#ffec64'
  });

let hslSliders = document.getElementsByClassName('hslSlider');
for(let i =0; i<hslSliders.length; i++){
    hslSliders[i].addEventListener('change', ()=>{
        let image = ctx.getImageData(0, 0, canvas.width, canvas.height)
        ctxx.putImageData(Utils.adjustHSL(image), 0, 0); 
        const data = ctxx.getImageData(0, 0, canvass.width, canvass.height)

        // //add the adjustment layer
        // getBrushData(canvasg, canvasg)

        ctxg.putImageData(data, 0, 0); 

        blendingModes.value === 'none' ? null : addGradient();
        // addGradient();
    })
}

// tresholdButton.addEventListener('click', () => {
//   let imageData = ctxx.getImageData(0, 0, canvas.width, canvas.height);
//   imageData = Filters.threshold(imageData,100);
//   ctxx.globalAlpha = 0.8;
//   ctxx.putImageData(imageData, 0, 0);
// });

//get hsl sliders previous value
let rRangePrevValue;
rRange.addEventListener('mousedown', ()=>{
    rRangePrevValue = rRange.value
    console.log(rRangePrevValue)
})

//gradient stuff

const colorStop_0 = document.getElementById("colorStop_0")
const colorStop_1 = document.getElementById("colorStop_1")

let color_0, color_1;

colorStop_0.addEventListener('change', ()=>{
    console.log("colorStop_0.value",colorStop_0.value )
    color_0 = colorStop_0.value
})

colorStop_1.addEventListener('change', ()=>{
    console.log("colorStop_1.value",colorStop_1.value )
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
    // drawBrushedLayer(canvasg)
    // getBrushData(canvasm, canvasg)
    
}

addGradientButton = document.getElementById('gr');
undoGradientButton = document.getElementById('undogr');

// addGradientButton.addEventListener('click', ()=>{
//     addGradient(); 
// })

undoGradientButton.addEventListener('click', ()=>{
    ctxg.clearRect(-canvasg.width/2, -canvasg.height/2, ctxg.canvas.width, ctxg.canvas.height);
    blendingModes.value = 'none'
})

    const blendingModes = document.getElementById('blending');
    blendingModes.addEventListener('change', ()=>{
        blendMode = blendingModes.value;
        addGradient(); 
        // drawBrushedLayer(canvasm)
        // getBrushData(canvasm, canvasg)
    })

// masking tests
//-------------------------------------------------------------------------------
let canvasm;
let ctxm;
const maskButton  = document.getElementById('maskButton')
maskButton.addEventListener('click', ()=>{
    canvasm = document.createElement('canvas');
    canvasm.classList.add('.canvasm');
    canvasm.style.position = 'absolute'
    ctxm = canvasm.getContext('2d')
    div.appendChild(canvasm);
    canvasm.style.height = '100%';
    canvasm.style.maxHeight = '330px';
    canvasm.width = img.width;
    canvasm.height = img.height;

    imgSizeM = Utils.aspectRatio(
        img.width,
        img.height,
        canvasm.width,
        canvasm.height
      );

    const centerShift_x = (canvasm.width - imgSizeM.width) / 2;
    const centerShift_y = (canvasm.height - imgSizeM.height) / 2;

    ctxm.clearRect(0, 0, canvasm.width, canvasm.height);
    ctxm.globalAlpha = 0;

    if (degrees == 90 || degrees == 270) {
        ctxm.translate(img.height / 2, img.width / 2);
    } else {
        ctxm.translate(img.width / 2, img.height / 2);
    }

    ctxm.rotate((degrees * Math.PI) / 180);
    ctxm.drawImage(img, -img.width / 2, -img.height / 2);

    ctxm.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        imgSizeM.width,
        imgSizeM.height
    );


    brush()
    addLayer(canvasm, ctxm)
    drawBrushedLayer(canvasm)
})


//brush tests
//----------------------------------------------------------------------
let brushData;
function brush() {
    // ctxM = canvasm.getContext('2d');
    //ctx.fillStyle = "rgba('255, 0, 0, 0.1')";
    ctxm.fillStyle = "red";
    ctxm.strokeStyle = "red";
    ctxm.globalAlpha = "0.01";
    ctxm.lineWidth = 0;
    ctxm.globalCompositeOperation = "source-over"; 
  
    let isDrawing, lastPoint;

    canvasm.addEventListener('mousedown', function(e){
        isDrawing = true;
        lastPoint = Utils.getMousePos(canvasm, e);
    })
  
    canvasm.addEventListener('mousemove', function(e) {
        if (!isDrawing) return;
        let currentPoint = Utils.getMousePos(canvasm, e);
        let dist = distanceBetween(lastPoint, currentPoint);
        let angle = angleBetween(lastPoint, currentPoint);

    
        for (var i = 0; i < dist; i+=3) {

            let wtf1 = lastPoint.x - canvasm.width/2
            let wtf2 = lastPoint.y - canvasm.height/2

            let x = wtf1 + (Math.sin(angle) * i) - 25;
            let y = wtf2 + (Math.cos(angle) * i) - 25;
            ctxm.beginPath();
            ctxm.arc(x+10, y+10, 20, false, Math.PI * 2, false);
            ctxm.closePath();
            ctxm.fill();
            ctxm.stroke();
        } 
        lastPoint = currentPoint;
        //draw layer icon
        drawBrushedLayer(canvasm)
        
    });
  
    canvasm.onmouseup = function() {
        isDrawing = false;
        // getBrushData(canvasm)
        drawBrushedLayer(canvasm)
        getBrushData(canvasm, canvasm)
    };

    // brushData = ctxm.getImageData(0,0, canvasm.width, canvasm.height)
    // return brushData;
    // getBrushData(canvasm)
}

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }
function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
  }
function clearit() {
    ctxM.clearRect(0,0, canvasm.width, canvasm.height);
}

//get brush pixels
function getBrushData(mask, target){
    let ctxM = mask.getContext('2d')
    brushData = ctxM.getImageData(0, 0, mask.width, mask.height),
    originalPixelData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let targetCtx = target.getContext('2d')
    targetData = targetCtx.getImageData(0, 0, target.width, target.height)

    for(let i=0; i<brushData.data.length; i+=4){
        if(brushData.data[i]!=0){
            targetData.data[i] = originalPixelData.data[i] * 1.35
            targetData.data[i+1] = originalPixelData.data[i+1] * 1.35
            targetData.data[i+2] = originalPixelData.data[i+2] * 1.35
        }
    }
    targetCtx.putImageData(targetData, 0,0)
}

//add layer icon
function addLayer(canvas, ctx){
    let layer = document.getElementById('layer')
    let layerCheckbox= document.getElementById('layerCheckbox')
    layer.style.visibility = 'visible'
    layerCheckbox.style.visibility = 'visible'
    canvasL = document.createElement('canvas');
    canvasL.style.width = '30px';
    canvasL.style.height = '20px';
    canvasL.classList.add('.canvasl');
    ctxl = canvasL.getContext('2d')
    let layerDiv = document.getElementById('layer')
    // layerDiv.style.background = 'gray'
    ctxl.fillStyle = "white";
    ctxl.fillRect(0, 0, canvasL.width, canvasL.height);
    layerDiv.appendChild(canvasL);
    // ctx.scale(0.2, 0.2)
    // canvasL.width = canvas.width * 0.2
    // canvasL.height = canvas.height * 0.2
    ctxl.drawImage(canvas, 0, 0)
}

function drawBrushedLayer(canvas){
    let ctxll = canvasL.getContext('2d')
    ctxll.drawImage(canvas, 0, 0, canvasL.width, canvasL.height)
}
