var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climbersGroup;
var ghost, ghostImg;
//var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png", "ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2.5;

  ghost = createSprite(200,200,10,10);
  ghost.addAnimation("Ghost", ghostImg);
  ghost.scale = 0.335;
  ghost.velocityY = 5;
  climbersGroup = new Group();
  doorsGroup = new Group();
}

function draw() {
  background(rgb(57, 172, 179));
 
  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("space")){
      ghost.velocityY= -10;
    }

    if(keyDown(RIGHT_ARROW)){
      ghost.x+=5;
    }

    if(keyDown(LEFT_ARROW)){
      ghost.x-=5;
    }

    if(ghost.x >= width-20){
      ghost.x = 20;
    }

    if(ghost.x <= -20){
      ghost.x = width-20;
    }

    if(ghost.isTouching(climbersGroup) || ghost.isTouching(doorsGroup) || ghost.y > height+75){
      gameState = "over";
      ghost.destroy();
    }

    ghost.velocityY= ghost.velocityY + 0.67;

    light();
  }

  drawSprites();

  if(gameState === "over"){
    tower.destroy();
    fill(rgb(224, 76, 27));
    stroke("Black");
    strokeWeight(5);
    textSize(45);
    text("Game Over", 200,200);
  }
}


function light(){
if(frameCount % 250 === 0){
  var climber = createSprite(Math.round(random(120,width-125)), 50);
climber.addImage("a-widnow", climberImg);
climber.velocityY = 2;
climbersGroup.add(climber);
climber.lifetime=340;

  var door = createSprite(climber.x,-21.5);
  door.addImage(doorImg);
  door.velocityY = 2;
  door.lifetime = 360;
  doorsGroup.add(door);
  }
}
