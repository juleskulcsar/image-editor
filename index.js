let div = document.querySelector('.canvas-container');
let canvas = document.createElement('canvas');
let canvass = document.createElement('canvas');
let canvasg = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const ctxx = canvass.getContext('2d');
const ctxg = canvasg.getContext('2d');
canvas.classList.add('.canvas');
canvass.classList.add('.canvass');
canvasg.classList.add('.canvasg');
canvas.style.position = 'absolute'
canvass.style.position = 'absolute'
canvasg.style.position = 'absolute'

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

const showOriginalButton = document.getElementById('showOriginal');
const undoGradientButton = document.getElementById('undogr');
const hslSliders = document.getElementsByClassName('hslSlider');

ctxg.globalAlpha = 0.5;
let img = new Image();

let painted = true;
let pixels;
let degrees = 0;
let imgSize;

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

selectImage.addEventListener('click', e => Utils.selectImg(e));

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
    let imageData = ctxx.getImageData(0, 0, canvas.width, canvas.height);
    switch (filterToApply) {
        case 'grayscale':
            imageData = Filters.bwEffect(imageData);
            ctxx.putImageData(imageData, 0, 0);
            addLayer(canvass, "Grayscale", "overlay")
            drawBrushedLayer(canvass)
            addGradient()
            break;
        case 'sepia':
            imageData = Filters.sepiaEffect(imageData);
            ctxx.putImageData(imageData, 0, 0);
            addLayer(canvass, "Sepia", "overlay")
            drawBrushedLayer(canvass)
            addGradient()
            break;
        case 'red':
            imageData = Filters.redEffect(imageData);
            ctxx.putImageData(imageData, 0, 0);
            addLayer(canvass, "Red", "overlay")
            drawBrushedLayer(canvass)
            addGradient()
            break;
        case 'cold':
            imageData = Filters.coldEffect(imageData);
            ctxx.putImageData(imageData, 0, 0);
            addLayer(canvass, "Cold", "overlay")
            drawBrushedLayer(canvass)
            addGradient()
            break;
        case 'warm':
            imageData = Filters.warmEffect(imageData);
            ctxx.putImageData(imageData, 0, 0);
            addLayer(canvass, "Warm", "overlay")
            drawBrushedLayer(canvass)
            addGradient()
            break;
        case 'warmdark':
            imageData = Filters.darkWarmEffect(imageData);
            ctxx.putImageData(imageData, 0, 0);
            addLayer(canvass, "Warm Dark", "overlay")
            drawBrushedLayer(canvass)
            addGradient()
            break;
        case 'cyan':
            imageData = Filters.cyanEffect(imageData);
            ctxx.putImageData(imageData, 0, 0);
            addLayer(canvass, "Cyan", "overlay")
            drawBrushedLayer(canvass)
            addGradient()
            break;
        case 'yellow':
            imageData = Filters.yellowEffect(imageData);
            ctxx.putImageData(imageData, 0, 0);
            addLayer(canvass, "Yellow", "overlay")
            drawBrushedLayer(canvass)
            addGradient()
            break;
        case 'washedout':
            imageData = Filters.washedOutEffect(imageData);
            ctxx.putImageData(imageData, 0, 0);
            addLayer(canvass, "Washedout", "overlay")
            drawBrushedLayer(canvass)
            addGradient()
            break;
        default:
            draw(img);
            break;
    }
});

//--------------------End of Event Listeners-------------------//

function draw(img) {
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

    let imageDataBackgroundCanvas = ctxx.getImageData(0, 0, canvas.width, canvas.height);
    ctxg.putImageData(imageDataBackgroundCanvas, 0, 0);
    // ctxg.drawImage(
    //     img,
    //     0,
    //     0,
    //     img.width,
    //     img.height,
    //     centerShift_x,
    //     centerShift_y,
    //     imgSize.width,
    //     imgSize.height
    // );

    Utils.rotate(0);
    pixels = ctx.getImageData(0, 0, imgSize.width, imgSize.height);
    pixelss = ctxx.getImageData(0, 0, imgSize.width, imgSize.height);
    pixelsg = ctxg.getImageData(0, 0, imgSize.width, imgSize.height);

    // addLayer(canvass, "BG")
    // drawBrushedLayer(canvass)
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

// hsl sliders event listeners;
for(let i =0; i<hslSliders.length; i++){
    hslSliders[i].addEventListener('change', ()=>{
        let image = ctx.getImageData(0, 0, canvas.width, canvas.height)
        ctxx.putImageData(Utils.adjustHSL(image), 0, 0); 
        const data = ctxx.getImageData(0, 0, canvass.width, canvass.height)

        // //add the adjustment layer
        ctxg.putImageData(data, 0, 0); 
        blendingModes.value === 'none' ? null : addGradient();
    })
}

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

//canvas filters
//brightness
function brightness(pixels, adjustment) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    d[i] += adjustment;
    d[i+1] += adjustment;
    d[i+2] += adjustment;
  }
  return pixels;
};

//treshold
function treshold(pixels, threshold) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
};