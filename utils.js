const Utils = {
    selectImg(e) {
        const URL = window.URL;
        let url;
        if(e.target.files.length !== 0){
            url = URL.createObjectURL(e.target.files[0]);
            img.src = url;
        }
        // img.src = url;
        img.onload = function() {
            if (img.width > 2000 || img.height > 2000) {
                alert('image too big');
                return;
            }
            // rotate(0);
            div.appendChild(canvas);
            div.appendChild(canvass);
            div.appendChild(canvasg);
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

    // donwloadImage() {
    //   let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //   ctx.putImageData(imageData, 0, 0);
    //   let dataURL = canvas.toDataURL('image/jpeg');
    //   button.href = dataURL;
    // },
    donwloadImage() {
        let imageCanvas = document.querySelector('.canvas');
        let ctx = imageCanvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // ctx.globalCompositeOperation = 'source-over';
        draw(img);

        let imageCanvas2 = document.querySelector('.canvas');
        let ctx2 = imageCanvas2.getContext('2d');

        let textCanvas = document.querySelector('.textCanvas');
        let ctxText = textCanvas.getContext('2d');
        let canvasTposition = textCanvas.getBoundingClientRect();
        let imageCanvasposition = imageCanvas.getBoundingClientRect();
        let canvasContainer = document.querySelector('.canvas-container');
        let canvasContainerposition = canvasContainer.getBoundingClientRect();
        console.log('textCanvasOffset: ', textCanvas.offsetLeft);
        console.log('imageCanvas offsetleft: ', imageCanvas.offsetLeft);
        console.log('canvasTposition: ', canvasTposition);
        console.log('image canvas pos: ', imageCanvasposition);
        console.log('canvasContainerposition: ', canvasContainerposition);
        const centerShift_x = (imageCanvas.width - image.width) / 2;
        const centerShift_y = (imageCanvas.height - image.height) / 2;

        // console.log(
        //     'textCanvas.width, textCanvas.height : ',
        //     textCanvas.width,
        //     textCanvas.height
        // );

        // this.downloadCanvas();

        ctx2.drawImage(
            image,
            // canvasTposition.left,
            // canvasTposition.top,
            // canvasTposition.width,
            // canvasTposition.height,
            // (canvasTposition.left - imageCanvasposition.left) - (canvasTposition.left - canvasContainerposition.left),
            // (canvasTposition.top - imageCanvasposition.top) - (canvasTposition.top - canvasContainerposition.top),
            // -imageCanvas.width / 2 + (canvasTposition.left - canvasContainerposition.left),
            // -imageCanvas.height / 2 + (canvasTposition.top - canvasContainerposition.top),
            -imageCanvas.width / 2 +
                (canvasTposition.left - imageCanvasposition.left) +
                60,
            -imageCanvas.height / 2 +
                (canvasTposition.top - imageCanvasposition.top) +
                60,
            imageCanvas.width,
            imageCanvas.height
        );

        let imageData = ctx2.getImageData(0, 0, canvas.width, canvas.height);
        ctx2.putImageData(imageData, 0, 0);
        let dataURL = canvas.toDataURL('image/jpeg');
        button.href = dataURL;
    },

    // downloadCanvas() {
    //     var imageCanvas = document.querySelector('.canvas');
    //     let textCanvas = document.querySelector('.textCanvas');

    //     var imageCanvasContext = imageCanvas.getContext('2d');
    //     imageCanvasContext.drawImage(textCanvas, 69, 50);

    //     // var dataURL = imageCanvas.toDataURL('image/png');
    //     // var link = document.createElement('a');
    //     // link.download = 'bottle-design.png';
    //     // link.href = bottleCanvas
    //     //     .toDataURL('image/png')
    //     //     .replace('image/png', 'image/octet-stream');
    //     // link.click();
    // },

    rotate(degrees) {
        //   canvas = document.querySelector('.canvas');
        let ctx = canvas.getContext('2d');
        let ctxx = canvass.getContext('2d');
        let ctxg = canvasg.getContext('2d');

        if (degrees == 90 || degrees == 270) {
            canvas.width = img.height;
            canvas.height = img.width;
        } else {
            canvas.width = img.width;
            canvas.height = img.height;
        }

        if (degrees == 90 || degrees == 270) {
            canvass.width = img.height;
            canvass.height = img.width;
        } else {
            canvass.width = img.width;
            canvass.height = img.height;
        }

        if (degrees == 90 || degrees == 270) {
            canvasg.width = img.height;
            canvasg.height = img.width;
        } else {
            canvasg.width = img.width;
            canvasg.height = img.height;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctxx.clearRect(0, 0, canvass.width, canvass.height);
        ctxg.clearRect(0, 0, canvasg.width, canvasg.height);

        if (degrees == 90 || degrees == 270) {
            ctx.translate(img.height / 2, img.width / 2);
        } else {
            ctx.translate(img.width / 2, img.height / 2);
        }
        ctx.rotate((degrees * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        if (degrees == 90 || degrees == 270) {
            ctxx.translate(img.height / 2, img.width / 2);
        } else {
            ctxx.translate(img.width / 2, img.height / 2);
        }
        ctxx.rotate((degrees * Math.PI) / 180);
        ctxx.drawImage(img, -img.width / 2, -img.height / 2);


        if (degrees == 90 || degrees == 270) {
            ctxg.translate(img.height / 2, img.width / 2);
        } else {
            ctxg.translate(img.width / 2, img.height / 2);
        }
        
        ctxg.rotate((degrees * Math.PI) / 180);
        ctxg.drawImage(img, -img.width / 2, -img.height / 2);
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

    removeText() {
        if (document.querySelector('.textCanvas')) {
            let textCanvas = document.querySelector('.textCanvas');
            const context = textCanvas.getContext('2d');
            context.clearRect(0, 0, textCanvas.width, textCanvas.height);

            // textDiv.removeChild(textCanvas)
            textCanvas.remove();
        }
        if (document.querySelector('.userText')) {
            textArea.value = '';
            textArea.remove();
        }
        if (document.querySelector('.temp-text')) {
            let tempText = document.querySelector('.temp-text');
            div.removeChild(tempText);
        }
        style = { top: 0, left: 0, width: 0, height: 0 };
        textDiv.style = style;
    },

    reset() {
        form.reset();
        Utils.editImage();
        draw(img);
    },

    resetFilter() {
        Utils.editImage();
        draw(img);
    },

    HSLToRGB(h,s,l) {
        // Must be fractions of 1
        s /= 100;
        l /= 100;
      
        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c/2,
            r = 0,
            g = 0,
            b = 0;
    
            if (0 <= h && h < 60) {
                r = c; g = x; b = 0;  
              } else if (60 <= h && h < 120) {
                r = x; g = c; b = 0;
              } else if (120 <= h && h < 180) {
                r = 0; g = c; b = x;
              } else if (180 <= h && h < 240) {
                r = 0; g = x; b = c;
              } else if (240 <= h && h < 300) {
                r = x; g = 0; b = c;
              } else if (300 <= h && h < 360) {
                r = c; g = 0; b = x;
              }
              r = Math.round((r + m) * 255);
              g = Math.round((g + m) * 255);
              b = Math.round((b + m) * 255);
    
              let rgb4 = [r,g,b]
              return rgb4;
      },

      adjustHSL(image){
        for (let i=0; i<image.data.length; i+=4){
            let r = image.data[i + 0];
            let g = image.data[i + 1];
            let b = image.data[i + 2];
       
            const hsl2 = this.RGBToHSL(r, g, b)
      
            let fromL = hsl2[2];
            let toL = rlRange.value;
            let greenToL = rlRange.value;
            let blueToL = blRange.value;
            let percent = 0.2
      
            let fromS = hsl2[1]
            let toS = rsRange.value;
            let percentL = 10
           
      
          if((0<hsl2[0] && hsl2[0]<60 )|| (340<hsl2[0] && hsl2[0]<360) ){
              rRange.value === 0 ? hsl2[0] = hsl2[0] : hsl2[0] = hsl2[0] + parseInt(rRange.value)
              rlRange.value === 50 ? hsl2[2] = hsl2[2] : hsl2[2] = fromL + percent * (toL - fromL)
              // rsRange.value === 50 ? hsl2[1] = hsl2[1] : hsl2[1] = fromS + percentL * (toS - fromS)
              rsRange.value === 50 ? hsl2[1] = hsl2[1] : hsl2[1] = rsRange.value
      
          }
      
              if(120<hsl2[0] && hsl2[0]<240 ){
                  gRange.value === 0 ? hsl2[0] = hsl2[0] : hsl2[0] = parseInt(gRange.value)
                  glRange.value === 50 ? hsl2[2] = hsl2[2] : hsl2[2] = fromL + percent * (greenToL - fromL)
                  gsRange.value === 50 ? hsl2[1] = hsl2[1] : hsl2[1] = gsRange.value
              }
      
              if(120<hsl2[0] && hsl2[0]<240 ){
                  bRange.value === 0 ? hsl2[0] = hsl2[0] : hsl2[0] = parseInt(bRange.value)
                  blRange.value === 50 ? hsl2[2] = hsl2[2] : hsl2[2] = fromL + percent * (blueToL - fromL)
                  bsRange.value === 50 ? hsl2[1] = hsl2[1] : hsl2[1] = bsRange.value
              }
      
            let rgb2 = Utils.HSLToRGB(hsl2[0],hsl2[1], hsl2[2])
      
            image.data[i + 0] = rgb2[0];
            image.data[i + 1] = rgb2[1];
            image.data[i + 2] = rgb2[2];
        }
      
        return image;
      },

      RGBToHSL(r,g,b) {
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;
      
        // Find greatest and smallest channel values
        let cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        
        // Calculate hue
        // No difference
        if (delta == 0)
            h = 0;
        // Red is max
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        // Green is max
        else if (cmax == g)
            h = (b - r) / delta + 2;
        // Blue is max
        else
            h = (r - g) / delta + 4;
    
        h = Math.round(h * 60);
        
        // Make negative hues positive behind 360°
        if (h < 0)
          h += 360;
    
        // Calculate lightness
        l = (cmax + cmin) / 2;
    
        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        
        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
    
        // document.getElementById("color3").innerText =`hsl( ${h}, ${s}%, ${l}%)` ;
        const hsl1 =[h,s,l]
        return hsl1
        
    },

    rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    },

    changeRGB(imageData) {
        for (let i=0; i<imageData.data.length; i+=4){
            let r = imageData.data[i + 0];
            let g = imageData.data[i + 1];
            let b = imageData.data[i + 2];
            let a = imageData.data[i + 3];
    
            if(r=== srgb[0] && g ===srgb[1] && b=== srgb[2]){
                imageData.data[i + 0] = parseInt(rRange.value)
                imageData.data[i + 1] = parseInt(gRange.value)
                imageData.data[i + 2] = parseInt(bRange.value)       
            }
        }
        ctx.putImageData(imageData, 0, 0);
        return imageData.data;
    },

    getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect(), // abs. size of element
          scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
          scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
    
      return {
        x: (event.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (event.clientY - rect.top) * scaleY     // been adjusted to be relative to element
      }
    },

    getElementPosition(obj) {
        let curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    },

    localBrightness(pixels, adjustment) {
        var d = pixels.data;
        for (var i=0; i<d.length; i+=4) {
          d[i] += adjustment;
          d[i+1] += adjustment;
          d[i+2] += adjustment;
        }
        return pixels;
    }
};
