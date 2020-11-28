var bg,bgimg,ground
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,bush
var FoodGroup, obstacleGroup
var score,survtime
var play=1,end=2
var gamestate=play


function preload(){
  
  bgimg=loadImage("jbackground.gif")
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bush=loadImage("bush.png")
 
}

function setup() 
{
  createCanvas(550,400);

  bg=createSprite(275,200);
  bg.addImage("bg",bgimg);

  
   iground=createSprite(275,340,550,5);
   iground.visible=false;
  
  monkey=createSprite(100,320);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  monkey.velocityY=2;

  FoodGroup = new Group();
  obstacleGroup= new Group();
  
}


function draw() 
{

  bg.velocityX=-5;
  
  if(bg.x<275)
    {
      bg=createSprite(bg.width+275,200)
      bg.addImage("bg",bgimg);
      bg.depth=monkey.depth-1;
      bg.lifetime=22.5;
    }
  
  obs();
  bananas();
  
  if(keyDown("space") && monkey.collide(iground))
    {
      monkey.velocityY=-13
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(iground);
  
  drawSprites();
  
  score=0
  
  survtime = Math.ceil(frameCount/frameRate());
  fill("yellow")
  textSize(20)
  text("Survival Time : "+ survtime,350,50);
  text("Score : "+ score,50,50);
}

function obs()
{
  if(frameCount%150===0)
    {  
      obstacle=createSprite(550,320)
      obstacle.velocityX=-5;
      obstacle.lifetime=120
      obstacle.depth=monkey.depth-1;
      
      var rand=Math.round(random(1,2));
      
      switch(rand)
        {
          case 1: obstacle.addImage("obs",obstacleImage)
                  obstacle.scale=0.1
                  break;
          case 2: obstacle.addImage("obs2",bush)
                  obstacle.scale=0.1
                  break;
      }
      obstacleGroup.add(obstacle);
    }

}

function bananas()
{
  if(frameCount%80===0)
    {
      banana=createSprite(550,Math.round(random(120,250)))
      banana.velocityX=-5;
      banana.lifetime=120;
      banana.addImage("food",bananaImage)
      banana.scale=0.1;
      banana.depth=monkey.depth-1;
      FoodGroup.add(banana);
    }
  
}
