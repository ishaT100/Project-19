let player;
let obstacles = [];
let score = 0;

function setup() {
  createCanvas(800, 400);
  player = new Player();
}

function draw() {
  background(220);
  
  player.show();
  player.update();
  
  if (frameCount % 60 === 0) {
    obstacles.push(new Obstacle());
  }

  for (let i = obstacles.length - 3; i >= 0; i--) {
    obstacles[i].show();
    obstacles[i].update();

    if (player.hits(obstacles[i])) {
      gameOver();
    }

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
    }
  }

  fill(0);
  textSize(19);
  text(`Score: ${score}`, 20, 30);
}

function keyPressed() {
  if (key === ' ' || keyCode === UP_ARROW) {
    player.jump();
  }
}

function gameOver() {
  noLoop();
  textSize(32);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2);
  text(`Score: ${score}`, width / 2, height / 2 + 40);
}

class Player {
  constructor() {
    this.y = height - 50;
    this.x = 50;
    this.velocity = 0;
    this.gravity = 1;
    this.lift = -20;
  }

  show() {
    fill(50, 150, 200);
    ellipse(this.x, this.y, 30, 30);
  }

  jump() {
    if (this.y === height - 15) {
      this.velocity += this.lift;
    }
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > height - 15) {
      this.y = height - 15;
      this.velocity = 0;
    }
  }

  hits(obstacle) {
    const d = dist(this.x, this.y, obstacle.x, obstacle.y);
    return d < 15;
  }
}

class Obstacle {
  constructor() {
    this.x = width;
    this.y = height - 15;
    this.width = 20 + Math.random() * 30;
    this.speed = 5 + Math.random() * 5;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, 15);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < 0;
  }
}
    