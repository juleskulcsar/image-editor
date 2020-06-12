const Utils = {
  selectImg(e) {
    const URL = window.URL;
    let url = URL.createObjectURL(e.target.files[0]);
    img.src = url;
    img.onload = function() {
      if (img.width > 2000 || img.height > 2000) {
        alert('image too big');
        return;
      }
      // rotate(0);
      div.appendChild(canvas);
      draw(img);
    };
  },

  editImage() {
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
  },

  donwloadImage() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
    let dataURL = canvas.toDataURL('image/jpeg');
    button.href = dataURL;
  },

  rotate(degrees) {
    //   canvas = document.querySelector('.canvas');
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
  },

  aspectRatio(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    //   console.log('ratio is: ', ratio);
    var newWidth = srcWidth * ratio;
    var newHeight = srcHeight * ratio;
    return {
      width: newWidth,
      height: newHeight
    };
  },

  checkRgbSplit() {
    if (checkRGB.checked === true) {
      rgbButton.disabled = false;
      rgbButton.classList.add('btn-active');
    } else {
      rgbButton.disabled = true;
      rgbButton.classList.remove('btn-active');
      draw(img);
    }
  },

  checkInvertColors() {
    if (checkInvert.checked === true) {
      invertButton.disabled = false;
      invertButton.classList.add('btn-active');
    } else {
      invertButton.disabled = true;
      invertButton.classList.remove('btn-active');
      draw(img);
    }
  },

  reset() {
    form.reset();
    Utils.editImage();
    draw(img);
  },

  resetFilter() {
    Utils.editImage();
    draw(img);
  }
};
