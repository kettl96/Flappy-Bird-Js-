const cvs = document.querySelector('#canvas');
const ctx = cvs.getContext('2d');

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = './img/flappy_bird_bird.png'
bg.src = './img/flappy_bird_bg.png'
fg.src = './img/flappy_bird_fg.png'
pipeUp.src = './img/flappy_bird_pipeUp.png'
pipeBottom.src = './img/flappy_bird_pipeBottom.png'

const gap = 90;
let score = 0;
document.addEventListener('keydown', moveUp);
function moveUp() {
  yPos -= 30;
}

const pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0
}


// bird 
let xPos = 10;
let yPos = 150;
let gravity = 1;
function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    if (pipe[i].x == 90) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      })
    }
    if (xPos + bird.width >= pipe[i].x
      && xPos <= pipe[i].x + pipeUp.width
      && (yPos <= pipe[i].y + pipeUp.height
        || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
      location.reload();
    }

    if (pipe[i].x == 5) {
      score++;
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += gravity;

  ctx.fillStyle = '#000';
  ctx.font = '24px'
  ctx.fillText('Score:' + score, 10, cvs.height - 20)
  requestAnimationFrame(draw);
}

pipeBottom.onload = draw;