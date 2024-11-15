const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成[min, max]范围内的数
function random (min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// 生成随机颜色值的函数
function randomColor () {
    const color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
    return color;
}


// 生成小球 圆心(x, y) 速度(velX, velY) 颜色color 半径size
function Ball (x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

// 小球移动
Ball.prototype.update = function () {
    if(this.x + this.size >= width || this.x - this.size <= 0) {
        this.velX = -this.velX;
    }

    if(this.y + this.size >= height || this.y - this.size <= 0) {
        this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
}

// 小球碰撞
Ball.prototype.collisionDetect = function () {
    for(let j = 0; j < balls.length; j ++ ) {
        if(this != balls[j]) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < this.size + balls[j].size) {
                balls[j]. color = this.color = randomColor();
            }
        }
    }
}

let balls = [];
let ballCount = 100;

while(balls.length < ballCount) {
    let size = random(10, 20);
    let ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomColor(),
        size,
    );
    balls.push(ball);
}

function loop () {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(0, 0, width, height);

    for(let i = 0; i < balls.length; i ++ ) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();