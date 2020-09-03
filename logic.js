// IMAGES AND AUDIOS
let baseImg = new Image();
baseImg.src = "./images/base.png";









// 1 - SETTING VARIABLES AND BASIS TO WORK WITH CANVAS

// getting elements and atributes from HTML
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const mainMenu = document.getElementById("mainMenu")
let mainMenuDisplay = mainMenu.getAttribute("display")
const startButton = document.getElementById("startButton")
let difficult = 0;
const canvasWidth = canvas.getAttribute("width");
const canvasHeight = canvas.getAttribute("height");


//some variables needed for the game
let animation;
let counter = 0;
let points = 0;
const randomNumbGen = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let appearance1 = randomNumbGen(500, 300);
let appearance2 = randomNumbGen(300, 200);
let appearance3 = randomNumbGen(250, 150);

let basePos = (0.75 * canvasHeight) + 40;


// 2 - CLASSES TO CREATE PLAYER AND ENEMIES\
class Creature {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.life = 1;
    this.speedX = 0;
    this.speedY = 0;
    this.jumps = 1;
    this.width = width
    this.height= height
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
    this.speedY = 5;
  }

  jump() {
    this.speedY = -5;
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
  obstacles.push(
    new Creature(
      canvasWidth,
      randomNumbGen(0.75 * canvasHeight, 0.7 * canvasHeight, ),
      25, 100
    )
  );
  console.log("obstacle added");
}

// 4 - MOVING FUNCTION

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
    let crashed = crashWithPlayer(elem)
    if(crashed){
        //   console.log(`CRASHED!! - elem = ${elem} idx = ${idx} elemX = ${elem.x}`);

        gameOver()
      
    }
  });
};

const gameOver = () => {
    setInterval(() => {
        ctx.clearRect(0,0,canvasWidth,canvasHeight)
        ctx.font = '30px Arial'
        ctx.fillStyle = "#f90404"
        ctx.fillText(`POINTS : ${points}` ,50, 50);
    }, 4000);
    console.log("gameOVer CALLED ")
    window.cancelAnimationFrame(animation);
    
};








// 7 - ENGINE FOR THE GAME

// 7.1 - function to draw players and objects
function drawElements() {
  // console.log("drawElements CALLED")

  //floor
  let floor = 0.75 * canvasHeight + 40;
  ctx.rect(0, floor, canvasWidth, 200);

  // player
  ctx.rect(player.x, player.y, player.width, player.height);

  //obstacles
  obstacles.forEach((elem, idx) => {
    // console.log(`elem idx = ${idx}  - - -  elem X = ${elem.x} - - -  elem Y = ${elem.y}`)
    // console.log(`elem = ${elem}`)
    ctx.rect(elem.x, elem.y, elem.width, elem.height);
    elem.x -= 3;
    if (elem.x < 0) {
      obstacles.shift();
    }
  });

  //image of the base
  ctx.drawImage(baseImg,0,basePos,canvasWidth,100)
}

// 7.2 - function to involve all the little functions that need to be called constantly
function startGame() {
  // console.log("startGame CALLED")
  
  counter += 1;
  
  console.log(points)
  
  ctx.beginPath();
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawElements();
  ctx.stroke();
  movePlayer();
  movePlayerSmoother();

  if (player.y >= 0.75 * canvasHeight + 1) {
    player.stopGravity();
    player.jumps = 1;
  }

  // COUNT AND PRINT POINTS
  points = Math.floor(counter/20)
  ctx.font = '30px Arial'
  ctx.fillStyle = "#0CEE1F"
  ctx.fillText(`POINTS : ${points}` ,515, 450);


  //   if(counter < 1000){
  if (counter % appearance1 == 0 || counter == 0) {
    generateObstacles();
  }
  //   }else if(counter > 900){
  //     if ( counter % 200 == 0){
  //      generateObstacles();
  //     }
  //   }else if(counter > 2000){
  //     if ( counter % 150 == 0){
  //      generateObstacles();
  //     }
  //   }

  console.log(obstacles);

  animation = window.requestAnimationFrame(startGame);
  checkGameOver();
}



// setInterval(() => {
//     startGame()
// }, 16);

startButton.onclick = () => {
  console.log("START BUTTON PRESSED")
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("canvas").style.display = "block"
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  window.requestAnimationFrame(startGame);
};
