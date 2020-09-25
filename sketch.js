var banana,bananaImage;
var stone,stoneImage;
var scene,sceneImage;
var score;
var monkey,monkey_running;
var foodGroup;
var obstacleGroup;
var ground;
var score = 0;

function preload() {
sceneImage = loadImage("jungle2.jpg");
  
monkey_running = 
loadAnimation(
"Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
bananaImage = loadImage("banana.png");
  
stoneImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
 
  scene = createSprite(200,200,800,400);
  scene.addAnimation("scene",sceneImage);
  
  ground = createSprite(200,375,400,20);
  ground.visible = false;
  
  monkey = createSprite(50,330,60,30);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
foodGroup = new Group();
obstacleGroup = new Group();
}

function draw() {
  background(220);
  
   drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,300,50);
  
  if(keyDown("space")){
  monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  scene.velocityX = -2;
  
  if(scene.x < 0) {
    scene.x = scene.width/2; 
   }
  ground.velocityX = -2;
  
  if(ground.x < 0) {
    ground.x = ground.width/2; 
   }
  monkey.collide(ground);
  
  if(monkey.isTouching(foodGroup)){
    score = score+2;
    foodGroup.destroyEach();
  }
  
  switch(score){
    case 10: monkey.scale=0.125;
            break;
    case 20: monkey.scale=0.145;
            break;
    case 30: monkey.scale=0.165;
            break;
    case 40: monkey.scale=0.185;
            break;
    case 50: monkey.scale=0.2;
            break;
    default: break;
  }
  
  if(monkey.isTouching(obstacleGroup)){
 score = score - 2;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  }
  
  bananas();
  obstacles();
}

 


function bananas(){  
if (World.frameCount % 80 === 0) {
var food = createSprite(400, 200);
food.addImage("banana",bananaImage);
food.scale = 0.05;
var rand = Math.round(random(180,200));
food.y = rand;
food.velocityX = -2;
food.lifetime = 200;
foodGroup.add(food);
}
}

function obstacles() {
if (World.frameCount % 300 === 0) {
var obstacle = createSprite(400, 350);
obstacle.addImage("stone",stoneImage);
obstacle.scale = 0.15;
obstacle.velocityX = -2;
obstacle.lifetime = 200;
obstacleGroup.add(obstacle);
}
}