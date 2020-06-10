let canvas = document.querySelector('.canvas');
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

//--------------------Event Listeners-------------------//

filter.addEventListener('change', () => {
  resetFilter();
  console.log(filter.value);
  const filterToApply = filter.value;
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  switch (filterToApply) {
    case 'grayscale':
      imageData = bwEffect(imageData);
      ctx.putImageData(imageData, 0, 0);
      break;
    case 'sepia':
      imageData = sepiaEffect(imageData);
      ctx.putImageData(imageData, 0, 0);
      break;
    case 'red':
      imageData = redEffect(imageData);
      ctx.putImageData(imageData, 0, 0);
      break;
    case 'cold':
      imageData = coldEffect(imageData);
      ctx.putImageData(imageData, 0, 0);
      break;
    case 'warm':
      imageData = warmEffect(imageData);
      ctx.putImageData(imageData, 0, 0);
      break;
    case 'warmdark':
      imageData = darkWarmEffect(imageData);
      ctx.putImageData(imageData, 0, 0);
      break;
    case 'cyan':
      imageData = cyanEffect(imageData);
      ctx.putImageData(imageData, 0, 0);
      break;
    case 'yellow':
      imageData = yellowEffect(imageData);
      ctx.putImageData(imageData, 0, 0);
      break;
    case 'washedout':
      imageData = washedOutEffect(imageData);
      ctx.putImageData(imageData, 0, 0);
      break;
    default:
      draw(img);
      break;
  }
});

selectImage.addEventListener('change', selectImg);

rotateButton.addEventListener('click', () => {
  degrees = (degrees + 90) % 360;
  rotate(degrees);
});

checkRGB.addEventListener('change', checkRgbSplit);

checkInvert.addEventListener('change', checkInvertColors);

range.forEach(option => option.addEventListener('change', editImage));

resetImage.addEventListener('click', reset);

rgbButton.addEventListener('click', () => {
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  imageData = rgbSplit(imageData);
  ctx.globalAlpha = 0.8;
  ctx.putImageData(imageData, 0, 0);
});

invertButton.addEventListener('click', () => {
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  invertColors(imageData.data);
  ctx.putImageData(imageData, 0, 0);
});

button.addEventListener('click', donwloadImage);

//--------------------Event Listeners-------------------//

//--------------------Functionality---------------------//
function selectImg(e) {
  const URL = window.URL;
  let url = URL.createObjectURL(e.target.files[0]);
  img.src = url;
  img.onload = function() {
    if (img.width > 2000 || img.height > 2000) {
      alert('image too big');
      return;
    }
    // rotate(0);
    draw(img);
  };
}

function draw(img) {
  ctx.shadowBlur = 20;
  ctx.shadowColor = 'rgb(0, 0, 0)';

  canvas.style.height = '100%';

  canvas.width = img.height;
  canvas.height = img.width;

  imgSize = aspectRatio(img.width, img.height, canvas.width, canvas.height);

  const centerShift_x = (canvas.width - imgSize.width) / 2;
  const centerShift_y = (canvas.height - imgSize.height) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  rotate(0);
  pixels = ctx.getImageData(0, 0, imgSize.width, imgSize.height);
}

function editImage() {
  let blur = document.getElementById('blur').value;
  let brightness = document.getElementById('br').value;
  let contrast = document.getElementById('ct').value;
  let hue = document.getElementById('huer').value;
  let opacity = document.getElementById('opacity').value;
  let saturation = document.getElementById('saturation').value;

  filters = `blur(${blur}px) 
  brightness(${brightness}%) 
  contrast(${contrast}%) 
  hue-rotate(${hue}deg) 
  opacity(${opacity}%)
  saturate(${saturation}%)`;

  canvas.style.webkitFilter = filters;

  brightnessValue.innerText = brightness;
  blurValue.innerText = blur;
  brightnessValue.innerText = brightness;
  contrastValue.innerText = contrast;
  hueValue.innerText = hue;
  opacityValue.innerText = opacity;
  saturationValue.innerText = saturation;
}

function rotate(degrees) {
  canvas = document.querySelector('.canvas');
  let ctx = canvas.getContext('2d');

  if (degrees == 90 || degrees == 270) {
    canvas.width = img.height;
    canvas.height = img.width;
  } else {
    canvas.width = img.width;
    canvas.height = img.height;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (degrees == 90 || degrees == 270) {
    ctx.translate(img.height / 2, img.width / 2);
  } else {
    ctx.translate(img.width / 2, img.height / 2);
  }
  ctx.rotate((degrees * Math.PI) / 180);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
}

function donwloadImage() {
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.putImageData(imageData, 0, 0);
  let dataURL = canvas.toDataURL('image/jpeg');
  button.href = dataURL;
}

function invertColors(data) {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i] ^ 255;
    data[i + 1] = data[i + 1] ^ 255;
    data[i + 2] = data[i + 2] ^ 255;
  }
  return data;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 50; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 10; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function greenEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] - 50; // RED
    pixels.data[i + 1] = pixels.data[i + 1] + 100; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function blueEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] - 50; // RED
    pixels.data[i + 1] = pixels.data[i + 1] + 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] + 150; // Blue
  }
  return pixels;
}

function sepiaEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    const red = pixels.data[i];
    const green = pixels.data[i + 1];
    const blue = pixels.data[i + 2];
    const alpha = pixels.data[i + 3];
    const tRed = 0.393 * red + 0.769 * green + 0.189 * blue;
    const tGreen = 0.394 * red + 0.686 * green + 0.168 * blue;
    const tBlue = 0.272 * red + 0.543 * green + 0.131 * blue;
    pixels.data[i] = tRed;
    pixels.data[i + 1] = tGreen;
    pixels.data[i + 2] = tBlue;
  }
  return pixels;
}
function bwEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    const red = pixels.data[i];
    const green = pixels.data[i + 1];
    const blue = pixels.data[i + 2];
    const alpha = pixels.data[i + 3];
    const gray = (red + green + blue) / 3;
    pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = gray;
  }
  return pixels;
}

function greenEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] - 100; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 1; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] - 5; // Blue
  }
  return pixels;
}
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 1; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] - 5; // Blue
  }
  return pixels;
}

function darkWarmEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 10; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 1; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] - 50; // Blue
  }
  return pixels;
}

function cyanEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 10; // RED
    pixels.data[i + 1] = pixels.data[i + 1] + 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] + 50; // Blue
  }
  return pixels;
}

function washedOutEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 50; // RED
    pixels.data[i + 1] = pixels.data[i + 1] + 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] + 50; // Blue
  }
  return pixels;
}

function yellowEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 50; // RED
    pixels.data[i + 1] = pixels.data[i + 1] + 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] - 50; // Blue
  }
  return pixels;
}

function warmEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 5; // RED
    pixels.data[i + 1] = pixels.data[i + 1] + 10; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] - 20; // Blue
  }
  return pixels;
}

function coldEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] - 5; // RED
    pixels.data[i + 1] = pixels.data[i + 1] + 10; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] + 20; // Blue
  }
  return pixels;
}

function testEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] - 20; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 200; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] - 20; // Blue
  }
  return pixels;
}
//--------------------Functionality---------------------//

//--------------------Helpers---------------------------//
function aspectRatio(srcWidth, srcHeight, maxWidth, maxHeight) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  console.log('ratio is: ', ratio);
  var newWidth = srcWidth * ratio;
  var newHeight = srcHeight * ratio;
  return {
    width: newWidth,
    height: newHeight
  };
}

function checkRgbSplit() {
  if (checkRGB.checked === true) {
    rgbButton.disabled = false;
    rgbButton.classList.add('btn-active');
  } else {
    rgbButton.disabled = true;
    rgbButton.classList.remove('btn-active');
    draw(img);
  }
}

function checkInvertColors() {
  if (checkInvert.checked === true) {
    invertButton.disabled = false;
    invertButton.classList.add('btn-active');
  } else {
    invertButton.disabled = true;
    invertButton.classList.remove('btn-active');
    draw(img);
  }
}

function reset() {
  form.reset();
  editImage();
  draw(img);
}

function resetFilter() {
  editImage();
  draw(img);
}
//--------------------Helpers---------------------------//
