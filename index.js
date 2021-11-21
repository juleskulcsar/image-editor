let div = document.querySelector('.canvas-container');
let canvas = document.createElement('canvas');
canvas.classList.add('canvas');
const ctx = canvas.getContext('2d');
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

    canvas.width = img.height;
    canvas.height = img.width;

    imgSize = Utils.aspectRatio(
        img.width,
        img.height,
        canvas.width,
        canvas.height
    );

    const centerShift_x = (canvas.width - imgSize.width) / 2;
    const centerShift_y = (canvas.height - imgSize.height) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
}
