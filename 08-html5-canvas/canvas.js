const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

// set canvas width and height to change depending on browser resize
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// start off with badass colour, when lines meet is rounded instead of square
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = '100';

// blends colours that overlap until eventually black
// ctx.globalCompositeOperation = 'multiply';

// blends colours that overlap until eventually white
// ctx.globalCompositeOperation = 'lighten';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    // Will stop the fn from running when the mouse isn't clicked down
    if (!isDrawing) return;
    // start drawing from
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    // draw to
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    // update x/y positions to last position mouse was
    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++;
    if(hue >= 360) {
        hue = 0;
    }

    // set line width to cycle between size 1 to 100 and back down again
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

canvas.addEventListener('mousemove', draw);
// created logic to set value of isDrawing to true or false depending on event occurring
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    // update x/y positions to first position mouse is
    [lastX, lastY] = [e.offsetX, e.offsetY];
    // lastX = e.offsetX;
    // lastY = e.offsetY;
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);