let scl;
let game;
let speed = 1;
let fps = 60;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  if(width < height) {
    scl = (width-15)/32;
  } else {
    scl = (height-15)/32;
  }

  game = new Game();
}

function draw() {
  background(0);

  translate(width/2-16*scl, height/2-16*scl);

  stroke(255);
  strokeWeight(1);
  fill(255);
  for(let i=0; i<game.snake.length; i++) {
    rect(game.snake[i][0]*scl, game.snake[i][1]*scl, scl, scl);
  }
  noStroke();
  fill(255, 0, 0);
  ellipse(game.apple[0]*scl + scl/2, game.apple[1]*scl + scl/2, scl, scl);

  noFill();
  stroke(255);
  strokeWeight(2);
  rect(-1, -1, scl*32+2, scl*32+2);

  for(let i=0; i<speed; i++) {
    game.move();
  }

  // if(game.isGameOver()) {
  //   noLoop();
  // }

  frameRate(fps);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);

  if(width < height) {
    scl = (width-15)/32;
  } else {
    scl = (height-15)/32;
  }
}

function keyPressed() {
  if(key == '+') {
    if(fps === 60) {
      speed++;
    } else {
      fps += 10;
    }
  } else if(key == '-') {
    if(speed > 1) {
      speed--;
    } else if(fps > 10) {
      fps -= 10;
    }
  } else if(key == '0') {
    speed = 1;
    fps = 60;
  }
}
