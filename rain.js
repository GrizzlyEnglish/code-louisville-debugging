class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = this.randomColor();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 360);
        ctx.fillStyle = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ', 1)';
        ctx.fill();
    }

    randomColor() {
        var test = parseInt(Math.random() * 3);
        if (test == 0) {
            //yellow
            return {
                r: 255,
                b: Math.floor(Math.random() * 255),
                g: 255
            }
        } else if (test == 1) {
            //blue
            return {
                r: Math.floor(Math.random() * 255),
                b: Math.floor(Math.random() * 255),
                g: 0
            }
        } else {
            //red
            return {
                r: Math.floor(Math.random() * 255),
                b: 0,
                g: 0
            }
        }
    }
}


class Environment {
    constructor(w, h) {
        this.Width = w;
        this.Height = h;
        this.SkyBox = {
            minX: -100,
            minY: -100,
            maxX: w + 100,
            maxY: h + 100
        };
        this.centerMass = null;
        this.Polarized = false;
        this.Circles = [];
    }

    update(dt) {

    }
}

var canvas;
var context;
var environment;
var now, then, fps;
var step = 1 / 60;

var mouseInterval;

document.addEventListener("DOMContentLoaded", function () {
    environment = new Environment(window.innerWidth, window.innerHeight);
    buildCanvas('canvas');
});

function buildCanvas(id) {
    canvas = document.getElementById(id);

    setCanvasSize();

    context = canvas.getContext('2d');

    context.lineWidth = 1;
    context.lineCap = "butt";

    then = Date.now();

    render();
};

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    environment.Width = canvas.width;
    environment.Height = canvas.height;
};

document.onmousedown = function (e) {
    let x = canvas.width * (e.pageX / canvas.width);
    let y = canvas.height * (e.pageY / canvas.height);
    var circle = new Circle(x, y, 1);
    environment.Circles.push(circle);
    mouseInterval = setInterval(function () {
        circle.r++;
    }, 100);
};

document.onmouseup = function (e) {
    let x = canvas.width * (e.pageX / canvas.width);
    let y = canvas.height * (e.pageY / canvas.height);
    console.log(`(${x},${y})`);
    environment.Circles.push(new Circle(x, y, 1));
};

function render() {
    var delta = (new Date().getTime() - then) / 1000;

    now = new Date().getTime();
    elapsed = now - then;

    requestAnimationFrame(render);

    environment.update(elapsed);

    context.fillStyle = "#FFF";
    context.fillRect(0, 0, environment.Width, environment.Height);

    for (var c = 0; c < environment.Circles.length; c++) {
        var p = environment.Circles[c];
        p.draw(context);
    }

    then = now;
};

window.addEventListener('resize', setCanvasSize, false);

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAni11111mationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();