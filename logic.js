


// 1 - SETTING VARIABLES AND BASIS TO WORK WITH CANVAS
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let difficult = 0;

const canvasWidth = canvas.getAttribute("width")
const canvasHeight = canvas.getAttribute("height")

let animation;



// 2 - CLASSES TO CREATE PLAYER AND ENEMIES
class Creature {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.life = 1;
    this.speedX = 0;
    this.speedY = 0;
    
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + 20;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + 20;
  }


  gravity() {
    if (this.y < 0.75 * canvasHeight) {
        this.speedY = 3;
    } else {
        console.log("passed 75% canvas height")
        this.speedY = 0
    }
  }

  jump(){
    this.speedY = -3
  }

}





// 3 - CREATING ELEMENTS
// 3.1 - PLAYER

const player = new Creature(50, (0.75*canvasHeight))

// 3.2 - OBSTACLES
// const obstacles = [];
// function generateObstacles(){
//     obstacles.push(new Creature)
// }







// 4 - POSITION UPDATE FOR EVERY ELEMENT




// 6 - MOVING FUNCTION

document.addEventListener('keydown', function(e){
    // console.log(`KEY ${e.keyCode} PRESSED `)
    movePlayer(e.keyCode);
  });


function movePlayerSmoother() {
    console.log("movePlayerSmoother CALLED")
    player.x += player.speedX;
    player.y += player.speedY;
  }

const movePlayer = (keycode) => {
    // console.log("movePlayer CALLED")
    switch (keycode){
  
      //A
      case 65: 
        if(player.x > 0){
          player.moveLeft() 
        }
      break;
  
      //W
      case 87: 
        if(player.y > 0){
          player.jump();
          setTimeout(() => {
            player.gravity()
        }, 500);
        }
      break;
  

      //D
      case 68:
        if(player.x < canvasWidth){
          player.moveRight()
        }  
      break;
    }
  }





// 8 - ENGINE FOR THE GAME

// 8.1 - function to draw players and objects
function drawElements(){
    // console.log("drawElements CALLED")
    // console.log(`player.x = ${player.x} - - -  player Y = ${player.y}`)
    
    ctx.rect(player.x, player.y, 40, 40);
    ctx.stroke()
}

// 8.2 - function to involve all the little functions that need to be called constantly
function startGame(){
    // console.log("startGame CALLED")
    ctx.clearRect(0,0,canvasWidth, canvasHeight)
    drawElements()
    movePlayer()
    movePlayerSmoother()
    ctx.beginPath()
    
    animation = window.requestAnimationFrame(startGame);
}

window.requestAnimationFrame(startGame);

// setInterval(() => {
//     startGame()
// }, 16);

document.getElementsByClassName("startButton").onclick = () => {
    // console.log("START BUTTON PRESSED")
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    startGame();

  };

  
  