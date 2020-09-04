// IMAGES AND AUDIOS
let baseImg = new Image();
baseImg.src = "./images/baseGrassMud.jpg";
let obstacleImg = new Image();
obstacleImg.src = "./images/obstacle.png";

const runImg1 = new Image();
runImg1.src = "./images/run/run1.png";
const runImg2 = new Image();
runImg2.src = "./images/run/run2.png";
const runImg3 = new Image();
runImg3.src = "./images/run/run3.png";
const runImg4 = new Image();
runImg4.src = "./images/run/run4.png";
const runImg5 = new Image();
runImg5.src = "./images/run/run5.png";
const runImg6 = new Image();
runImg6.src = "./images/run/run6.png";
const runImg7 = new Image();
runImg7.src = "./images/run/run7.png";
const runImg8 = new Image();
runImg8.src = "./images/run/run8.png";
const runImg9 = new Image();
runImg9.src = "./images/run/run9.png";
const runImg10 = new Image();
runImg10.src = "./images/run/run10.png";
const runImg11 = new Image();
runImg11.src = "./images/run/run11.png";
const runImg12 = new Image();
runImg12.src = "./images/run/run12.png";

// 1 - SETTING VARIABLES AND BASIS TO WORK WITH CANVAS

// getting elements and atributes from HTML
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const mainMenu = document.getElementById("mainMenu");
let mainMenuDisplay = mainMenu.getAttribute("display");
const startButton = document.getElementById("startButton");
let difficult = 0;
const canvasWidth = parseInt(canvas.getAttribute("width"));
const canvasHeight = canvas.getAttribute("height");

//some variables needed for the game
let animation;
let counter = 0;
let points = 0;
const randomNumbGen = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let appearance1 = randomNumbGen(400, 250);
let appearance2 = randomNumbGen(250, 175);
let appearance3 = randomNumbGen(175, 100);

let basePos = 0.75 * canvasHeight + 40;

// 2 - CLASSES TO CREATE PLAYER AND ENEMIES\
class Creature {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.life = 1;
    this.speedX = 0;
    this.speedY = 0;
    this.jumps = 1;
    this.width = width;
    this.height = height;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  gravity() {
    this.speedY = 7;
  }

  jump() {
    this.speedY = -7;
  }
  stopGravity() {
    this.speedY = 0;
  }
}

// 3 - CREATING ELEMENTS
// 3.1 - PLAYER

const player = new Creature(50, 0.75 * canvasHeight, 40, 40);

// 3.2 - OBSTACLES

const obstacles = [];
function generateObstacles() {
  let randHeight = randomNumbGen(0.75 * canvasHeight, 0.62 * canvasHeight);
  obstacles.push(
    new Creature(canvasWidth, randHeight, 25, basePos - randHeight)
  );
  console.log("obstacle added");
}

// 4 - MOVING FUNCTIONS

document.addEventListener("keydown", function (e) {
  // console.log(`KEY ${e.keyCode} PRESSED `)
  movePlayer(e.keyCode);
});

function movePlayerSmoother() {
  //console.log("movePlayerSmoother CALLED");
  player.x += player.speedX;
  player.y += player.speedY;
}

const movePlayer = (keycode) => {
  // console.log("movePlayer CALLED")
  switch (keycode) {
    //W
    case 87:
      if (player.y <= 0.76 * canvasHeight + 1 && player.jumps != 0) {
        player.jump();
        player.jumps -= 1;
        setTimeout(() => {
          player.gravity();
        }, 500);
      }

      break;
  }
};

const moveBase = {
  posX : 0,
  baseSpeed : -4,

  
  updateBase : function(){
    this.posX += this.baseSpeed;
    this.posX %= canvasWidth
    console.log(this.posX)
  },
  
  drawBase : function(){
    ctx.drawImage(baseImg, this.posX, basePos, canvasWidth, 200);
    ctx.drawImage(baseImg, this.posX + canvasWidth ,basePos, canvasWidth, 200 )
    console.log(canvasWidth);
    console.log(baseImg.width)
  }
}




// 5 - CHECK GAME OVER

function crashWithPlayer(elem) {
  return !(
    player.bottom() < elem.top() ||
    player.top() > elem.bottom() ||
    player.right() < elem.left() ||
    player.left() > elem.right()
  );
}

const checkGameOver = () => {
  obstacles.forEach((elem, idx) => {
    let crashed = crashWithPlayer(elem);
    if (crashed) {
      //   console.log(`CRASHED!! - elem = ${elem} idx = ${idx} elemX = ${elem.x}`);

      gameOver();
    }
  });
};

const gameOver = () => {
  setInterval(() => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#f90404";
    ctx.fillText(`POINTS : ${points}`, 0.41 * canvasWidth, 0.5 * canvasHeight);
    ctx.fillStyle = "#f90404";
    ctx.fillText(`GAME OVER`, 0.405 * canvasWidth, 0.44 * canvasHeight);
    ctx.drawImage(baseImg, -200, basePos, 1500, 200);
  }, 4000);
  console.log("gameOVer CALLED ");
  window.cancelAnimationFrame(animation);
};

// 7 - ENGINE FOR THE GAME

// 7.1 - function to draw players and objects
function drawElements() {
  // console.log("drawElements CALLED")

  //floor
  
  // player
  if (counter % 16 <= 8)  {
    ctx.drawImage(runImg1, player.x, player.y, player.width, player.height);
  } else {
    ctx.drawImage(runImg2, player.x, player.y, player.width, player.height);
  }


  //obstacles
  obstacles.forEach((elem) => {
    // console.log(`elem idx = ${idx}  - - -  elem X = ${elem.x} - - -  elem Y = ${elem.y}`)
    // console.log(`elem = ${elem}`)
    ctx.fillStyle = "#797a79";
    ctx.drawImage(obstacleImg, elem.x, elem.y, elem.width, elem.height);
    elem.x -= 4;
    if (elem.x < 0) {
      obstacles.shift();
    }
  });

}

// 7.2 - function to involve all the little functions that need to be called constantly
function startGame() {
  // console.log("startGame CALLED")

  counter += 1;

  console.log(points);

 
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawElements();
  moveBase.drawBase()
  moveBase.updateBase()

  movePlayer();
  movePlayerSmoother();

  if (player.y >= 0.75 * canvasHeight + 1) {
    player.stopGravity();
    player.jumps = 1;
  }

  // COUNT AND PRINT POINTS
  points = Math.floor(counter / 20);
  ctx.font = "30px Arial";
  ctx.fillStyle = "#0CEE1F";
  ctx.fillText(`POINTS : ${points}`, 0.8 * canvasWidth, 0.1 * canvasHeight);

  if (counter < 1000) {
    if (counter % appearance1 == 0 || counter == 0) {
      generateObstacles();
    }
  } else if (counter >= 1000) {
    if (counter % appearance2 == 0) {
      generateObstacles();
    }
  } else if (counter > 2000) {
    if (counter % appearance3 == 0) {
      generateObstacles();
    }
  }

  console.log(obstacles);

  animation = window.requestAnimationFrame(startGame);
  checkGameOver();
}

// setInterval(() => {
//     startGame()
// }, 16);

startButton.onclick = () => {
  console.log("START BUTTON PRESSED");
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  window.requestAnimationFrame(startGame);
};
