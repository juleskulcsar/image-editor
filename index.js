let div = document.querySelector('.canvas-container');
let canvas = document.createElement('canvas');
let canvass = document.createElement('canvas');
let canvasg = document.createElement('canvas');
canvas.classList.add('.canvas');
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

let pixelss;
let pixelsg;
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
    canvas.style.maxHeight = '350px';

    canvass.style.height = '100%';
    canvass.style.maxHeight = '350px';

    canvasg.style.height = '100%';
    canvasg.style.maxHeight = '350px';

    canvas.width = img.height;
    canvas.height = img.width;

    canvass.width = img.height;
    canvass.height = img.width;

    canvasg.width = img.height;
    canvasg.height = img.width;

    imgSize = Utils.aspectRatio(
        img.width,
        img.height,
        700,
        350
    );


    const centerShift_x = (canvas.width - imgSize.width) / 2;
    const centerShift_y = (canvas.height - imgSize.height) / 2;

    canvas.style.left = (764-imgSize.width)/2+'px';
    canvass.style.left = (764-imgSize.width)/2+'px';
    canvasg.style.left = (764-imgSize.width)/2+'px';

    canvas.style.top = (664-imgSize.height)/2+'px';
    canvass.style.top = (664-imgSize.height)/2+'px';
    canvasg.style.top = (664-imgSize.height)/2+'px';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxx.clearRect(0, 0, canvass.width, canvass.height);
    ctxg.clearRect(0, 0, canvasg.width, canvasg.height);

    // let userText = image;

    // ctx.fillStyle = userText;

    //img.onload = function() {
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
    //};

    ctxx.drawImage(
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


    ctxg.drawImage(
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
    pixelss = ctxx.getImageData(0, 0, imgSize.width, imgSize.height);
    pixelsg = ctxg.getImageData(0, 0, imgSize.width, imgSize.height);
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
    canvass.style.visibility = "hidden";
    canvasg.style.visibility = "hidden";
    canvasm ? canvasm.style.visibility = "hidden" : null;
  });
showOriginalButton.addEventListener('mouseup', () => {
    canvass.style.position = 'absolute';
    canvasg.style.position = 'absolute';
    canvass.style.visibility = 'visible';
    canvasg.style.visibility = 'visible';
    canvasm ? canvasm.style.visibility = 'visible': null;
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
})

let gRangePrevValue;
rRange.addEventListener('mousedown', ()=>{
    gRangePrevValue = gRange.value
})

let bRangePrevValue;
bRange.addEventListener('mousedown', ()=>{
    bRangePrevValue = bRange.value
})

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
    canvasm.style.maxHeight = '350px';
    canvasm.width = img.width;
    canvasm.height = img.height;

    imgSizeM = Utils.aspectRatio(
        img.width,
        img.height,
        700,
        350
      );

    const centerShift_x = (canvasm.width - imgSizeM.width) / 2;
    const centerShift_y = (canvasm.height - imgSizeM.height) / 2;

    canvasm.style.left = (764-imgSizeM.width)/2+'px';
    canvasm.style.top = (664-imgSizeM.height)/2+'px';

    ctxm.clearRect(0, 0, canvasm.width, canvasm.height);
    ctxm.globalAlpha = 0;

    if (degrees == 90 || degrees == 270) {
        ctxm.translate(img.height / 2, img.width / 2);
    } else {
        ctxm.translate(img.width / 2, img.height / 2);
    }

    ctxm.rotate((degrees * Math.PI) / 180);
    // ctxm.drawImage(img, -img.width / 2, -img.height / 2);

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
    addLayer(canvasm, "Layer", ctxm)
    drawBrushedLayer(canvasm)
})


//brush tests
//----------------------------------------------------------------------
let brushData;
function brush() {
    ctxm.fillStyle = "red";
    // ctxm.strokeStyle = "red";
    // ctxm.globalAlpha = "0.03";
    // ctxm.lineWidth = 0;
    // ctxm.globalCompositeOperation = "source-over"; 
  
    let isDrawing, lastPoint, isDown, mouseCircle ;

    canvasm.addEventListener('mousedown', function(e){
        isDrawing = true;
        isDown = true;
        canvasm.style.cursor = 'none'; 
        lastPoint = Utils.getMousePos(canvasm, e);

        mouseCircle = document.createElement('div');
        mouseCircle.classList.add('mouse-circle');
        let revisedMousePosX = 0,
                revisedMousePosY = 0,
                mousePosX = e.pageX;
                mousePosY = e.pageY;
        revisedMousePosX += (mousePosX - revisedMousePosX)
        revisedMousePosY += (mousePosY - revisedMousePosY)     

        const style = `position: absolute;
            border: 1px solid white;
            border-radius: 50%;
            pointer-events: none !important;
            box-shadow: 0 0 16px rgba(255, 255, 255, 0)`
        mouseCircle.style.cssText = style;
        document.body.appendChild(mouseCircle);
  
    })
  
    canvasm.addEventListener('mousemove', function(e) {
        if (!isDrawing) return;

        if(isDown===true){
            let revisedMousePosX = 0,
                revisedMousePosY = 0,
                mousePosX = e.pageX;
                mousePosY = e.pageY;

            function mouseFollow() {
                requestAnimationFrame(mouseFollow);
                revisedMousePosX += (mousePosX - revisedMousePosX)
                revisedMousePosY += (mousePosY - revisedMousePosY);
                const radius = radiusElem.value;
                if(mouseCircle){
                    mouseCircle.style.top = revisedMousePosY-radius/2 +  'px';
                    mouseCircle.style.left = revisedMousePosX-radius/2 + 'px';
                }
            }
            mouseFollow();
        }

        let currentPoint = Utils.getMousePos(canvasm, e);
        let dist = distanceBetween(lastPoint, currentPoint);
        let angle = angleBetween(lastPoint, currentPoint);

        const radius = radiusElem.value;
        const hradius = hradiusElem.value;
        const hardness = hardnessElem.value;
        alpha = alphaElem.value;
        mouseCircle.style.width = hradius + 'px';
        mouseCircle.style.height = radius + 'px';
        strokeGradient = createFeatherGradient1(radius, hardness);
    
        for (var i = 0; i < dist; i+=3) {
            let s = i/dist
            let wtf1 = lastPoint.x - canvasm.width/2
            let wtf2 = lastPoint.y - canvasm.height/2
            let x = wtf1 + (Math.sin(angle) * i) - 25;
            let y = wtf2 + (Math.cos(angle) * i) - 25;
            ctxm.strokeStyle = strokeGradient;
            ctxm.globalAlpha = alpha/4;
            ctxm.beginPath();
            // ctxm.arc(x+20, y+20, radius*2, false, Math.PI*2, false);
            ctxm.ellipse(x+20, y+20, hradius*2, radius*2, 0, 2, Math.PI*2, false);
            ctxm.fill()
            ctxm.stroke();

        } 
        lastPoint = currentPoint;
        //draw layer icon
        drawBrushedLayer(canvasm)
    });
    canvasm.addEventListener('mouseup', function(e){
        isDrawing = false;
        isDown = false;
        mouseCircle = document.querySelector('.mouse-circle')
        drawBrushedLayer(canvasm)
        getBrushData(canvasm, canvasm)
        document.body.removeChild(mouseCircle);
        canvasm.style.cursor = 'default';
    })
}

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }
function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
  }
function clearit() {
    ctxm.clearRect(0,0, canvasm.width, canvasm.height);
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
let count = 1
function addLayer(canvas, layerName, ctx){
    let layerContainer = document.getElementById('layerContainer')
    //layer group
    let layerGroup = document.createElement('div')
    layerGroup.classList.add("layerGroup", `${count}`)

    //canvas group
    let canvasGroup = document.createElement('div')
    let name = document.createElement('p')
    name.setAttribute("contenteditable","true")
    canvasGroup.classList.add('canvasGroup')
    layerGroup.appendChild(canvasGroup)

    //checkbox
    let checkbox = document.createElement('input')
    checkbox.classList.add('layerCheckbox')
    checkbox.type = 'radio'
    checkbox.checked= 'checked'
    checkbox.style.visibility = 'visible'
    
    //layer canvas
    let buttonGroup = document.createElement('div')
    buttonGroup.classList.add('buttonGroup')
    buttonGroup.style.visibility = 'visible'

    //delete icon
    let delButton = document.createElement('button')
    let delIcon = document.createElement('img')
    delIcon.classList.add('delete-icon')
    delButton.classList.add("delete", `${count}`)
    delIcon.src = 'public/delete1.png'
    delButton.appendChild(delIcon)

    //hide icon
    let hideButton = document.createElement('button')
    let hideIcon = document.createElement('img')
    hideIcon.classList.add("hide-icon")
    hideButton.classList.add('hide', `${count}`)
    hideIcon.src = 'public/icons8-invisible-24.png'
    hideButton.appendChild(hideIcon)

    if(layerName ==="Layer"){
        name.innerText = `${layerName} ${count++}`
    } else if (layerName === "Gradient"){
        name.innerText = layerName
        layerGroup.classList.add('gradient')
    } else {
        name.innerText = layerName
    }

    //calculate canvas size ratio
    canvasL = document.createElement('canvas');
    canvasL.classList.add('.canvasl');
    canvasL.style.padding = '1px';
    canvasL.style.border = '1px solid rgba(185, 185, 185, 0.85)';
    canvasL.style.marginRight = "0.5em"
    canvasL.width = img.height;
    canvasL.height = img.width;
    let size = Utils.aspectRatio(
        img.width,
        img.height,
        30,
        20)

    canvasL.style.width = size.width+'px';
    canvasL.style.height = size.height+'px';

    ctxl = canvasL.getContext('2d')
    ctxl.fillStyle = "white";
    ctxl.fillRect(0, 0, canvasL.width, canvasL.height);
    canvasGroup.appendChild(checkbox)
    canvasGroup.appendChild(canvasL);
    canvasGroup.appendChild(name)
    layerContainer.appendChild(layerGroup)
    buttonGroup.appendChild(hideButton);
    buttonGroup.appendChild(delButton);
    layerGroup.appendChild(canvasGroup)
    layerGroup.appendChild(buttonGroup)
    ctxl.drawImage(canvas, 0, 0)
}

function drawBrushedLayer(canvas){
    let ctxll = canvasL.getContext('2d')
    ctxll.drawImage(canvas, 0, 0, canvasL.width, canvasL.height)
}

//---------brush size test--------------------------
const brushDisplayCtx = document.querySelector('#brush-display').getContext('2d');
const radiusElem = document.querySelector('#radius');
const hradiusElem = document.querySelector('#radius-h');
const hardnessElem = document.querySelector('#hardness');
const alphaElem = document.querySelector('#alpha');
const brushDisplay = document.querySelector('#brush-display')

radiusElem.addEventListener('input', updateBrushSettings);
hradiusElem.addEventListener('input', updateBrushSettings);
hardnessElem.addEventListener('input', updateBrushSettings);
alphaElem.addEventListener('input', updateBrushSettings);
brushDisplay.addEventListener('dblclick', e=> {
    radiusElem.value = 26;
    hradiusElem.value = 26;
    alphaElem.value = 0.5;
    updateBrushSettings();
})

const brushCtx = document.createElement('canvas').getContext('2d');
let featherGradient;
let strokeGradient;

function createFeatherGradient(radius, hardness) {
  const innerRadius = Math.min(radius * hardness, radius - 1);
  const gradient = brushCtx.createRadialGradient(
    0, 0, innerRadius,
    0, 0, radius);
  gradient.addColorStop(0, 'rgba(255, 0, 0, 0)');
  gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');
  
  return gradient;
}

function createFeatherGradient1(radius, hardness) {
  const innerRadius = Math.min(radius * hardness, radius - 1);
  const gradient = ctxm.createRadialGradient(
    0, 0, innerRadius,
    0, 0, radius);
  gradient.addColorStop(0, 'rgba(255, 0, 0, 0)');
  gradient.addColorStop(.43, `rgba(255, 0, 0, ${alpha})`);
  gradient.addColorStop(.57, `rgba(255, 0, 0, ${alpha})`);
  gradient.addColorStop(1, `rgba(255, 0, 0, 0`);
  return gradient;
}

function feather(ctx) {
  // feather the brush
  ctx.save();
  ctx.fillStyle = featherGradient;
  ctx.globalCompositeOperation = 'destination-out';
  const {width, height} = ctx.canvas;
  ctx.translate(width / 2, height / 2);
  ctx.fillRect(-width / 2, -height / 2, width, height);  
  ctx.restore();
}

function updateBrushSettings() {
  const radius = radiusElem.value;
  radiusElem.nextElementSibling.value = radius
  const hradius = hradiusElem.value;
  hradiusElem.nextElementSibling.value = hradius
  const hardness = hardnessElem.value;
//   hardnessElem.nextElementSibling.value = hardness
  alpha = alphaElem.value;
  alphaElem.nextElementSibling.value = alpha
  featherGradient = createFeatherGradient(radius, hardness);
//   brushCtx.canvas.width = radius * 2;
//   brushCtx.canvas.height = radius * 2;

  let scaleX = 1/(brushDisplay.width / hradius/2);
  let scaleY = 1/(brushDisplay.height / radius/2);
  
  {
    const ctx = brushDisplayCtx;
    const {width, height} = ctx.canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.setTransform(scaleX,0,0,scaleY,0,0)
    ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
    ctx.fillRect(width / 2 - radius, height / 2 - radius, radius * 2, radius * 2);
    feather(ctx);
  }
}
updateBrushSettings()

function updateBrush(x, y) {
  let width = brushCtx.canvas.width;
  let height = brushCtx.canvas.height;
  let srcX = x - width / 2;
  let srcY = y - height / 2;
  // draw it in the middle of the brush
  let dstX = (brushCtx.canvas.width - width) / 2;
  let dstY = (brushCtx.canvas.height - height) / 2;

  brushCtx.drawImage(
    ctx.canvas,
    srcX, srcY, width, height,
    dstX, dstY, width, height);    
  
  feather(brushCtx);
}
