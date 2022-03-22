let canvasm;
let ctxm;
let brushData;
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
    addLayer(canvasm, "Layer", 'adjustmentLayer')
    drawBrushedLayer(canvasm)
})

function brush() {
    ctxm.fillStyle = "red";
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
    
        for (var i = 0; i < dist; i+=3) {
            let s = i/dist
            let wtf1 = lastPoint.x - canvasm.width/2
            let wtf2 = lastPoint.y - canvasm.height/2
            let x = wtf1 + (Math.sin(angle) * i) - 25;
            let y = wtf2 + (Math.cos(angle) * i) - 25;
            ctxm.globalAlpha = alpha/4;
            ctxm.beginPath();
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
let count = 1
function addLayer(canvas, layerName, layerType){
    let layerContainer = document.getElementById('layerContainer')
    //layer group
    let isOverlay = document.querySelector('.overlay')
    let removeOverlay = isOverlay && layerType==="overlay" ? true : false
    let layerGroup = document.createElement('div')
    layerGroup.classList.add("layerGroup", `${count}`, layerType)
    count++;

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
        name.innerText = `${layerName} ${count}`
    } else if (layerName === "Gradient"){
        name.innerText = layerName
        layerGroup.classList.add('gradient')
    } else {
        name.innerText = layerName
    }

    //calculate canvas size ratio
    canvasL = document.createElement('canvas');
    canvasL.classList.add('.canvasl');
    // canvasL.classList.add(layerName);
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
    //check if layer type overlay exsists. If true, remove before adding new overlay selected
    if(removeOverlay){
        isOverlay.replaceWith(layerGroup)
        count--
    } else {
        layerContainer.prepend(layerGroup)
    }
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

//brush size
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

function feather(ctx) {
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

  alpha = alphaElem.value;
  alphaElem.nextElementSibling.value = alpha
  featherGradient = createFeatherGradient(radius, hardness);
  
  //scale brush display according to h/v radius
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
