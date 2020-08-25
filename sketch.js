var monkey, bannanaGroup, obstaclesGroup, monkey_running, backscene, scene, bannanaImage, obstacleImage, ground, gameOver;
var score=0;

function preload(){
  monkey_running = loadAnimation("Monkey_01.png" , "Monkey_02.png" , "Monkey_03.png" ,     "Monkey_04.png" , "Monkey_05.png" , "Monkey_06.png", "Monkey_07.png", "Monkey_08.png" ,   "Monkey_09.png" , "Monkey_10.png");
  scene = loadImage("jungle.jpg");
  obstacleImage=loadImage("stone.png");
  bannanaImage=loadImage("banana.png");
}


function setup() {
  createCanvas(800,400);
  backscene = createSprite(0,0,800,400);
  backscene.addImage(scene);
  backscene.scale = 1.5
  backscene.velocityX=-4; 
  backscene.x = backscene.width/2
  monkey=createSprite(100,340, 20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  ground = createSprite(200,350, 400,10);
  ground.visible=false;
  bannanaGroup = new Group();  
  obstaclesGroup = new Group();

  score = 0;
}


function draw(){
  background(150); 


  if(backscene.x < 100){
   backscene.x=backscene.width/2 
  } 
  
  if(keyDown("space") && monkey.y >=270){
    monkey.velocityY = -22 ;
  }
  
  if(bannanaGroup.isTouching(monkey)){
    bannanaGroup.destroyEach();
    score=score+2
  }
    switch(score){
      case 10: monkey.scale=0.12;
              break;
      case 20: monkey.scale=0.14;
              break;
      case 30: monkey.scale=0.16;
              break;
      case 40: monkey.scale=0.18;
              break;
      default: break;
    }
  
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.07;
  }
  
  monkey.velocityY=monkey.velocityY+1;
  monkey.collide(ground);
  spawnBannanas();
  spawnObstacles();
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500,50);
}


function spawnObstacles() {
  if(frameCount % 300 === 0) {
  var obstacle = createSprite(800,330 ,40,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
  obstacle.velocityX = -10;
  obstaclesGroup.add(obstacle);
  obstacle.setLifetime = 100;
 
  }
}

function spawnBannanas() {
  if (frameCount % 80 === 0){
  var bannana = createSprite(800,300, 10,10);
  bannana.y = Math.round(random(120,200));
  bannana.addImage(bannanaImage);
  bannana.scale = 0.05;
  bannana.velocityX = -10;  
  bannanaGroup.add(bannana);
    
  }
}
