var bg, bg_image;
var fg,fg_image;
var bird, bird_image;
var pipe1, pipeNorth_image;
var pipe2,pipeSouth_image;
var pipe1Group, pipe2Group;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, r;

function preload(){
bg_image=loadImage("bg.jpeg");
fg_image=loadImage("fg.jpeg");
bird_image=loadImage("bird.png");
pipeNorth_image=loadImage("pipeNorth.png");
pipeSouth_image=loadImage("pipeSouth.png");
r=loadImage("unnamed.png");
}

function setup(){
createCanvas(288,512);

//back ground
bg=createSprite(144,256,10,10);
bg.addImage(bg_image);

//foot ground
fg=createSprite(144,470,20,20);
fg.addImage(fg_image);

//bird
bird=createSprite(25,256,20,10);
bird.addImage(bird_image);

//pipe groups
pipe1Group=new Group();
pipe2Group=new Group();

//scoring
score=0;

//restarting the game
restart = createSprite(144,256,10,10);
restart.addImage(r);
restart.visible=false;
restart.scale = 0.4;
}

function draw() {
    background(0,151,157);

    if(gameState===PLAY){
    //footground movement
    fg.velocityX=-1;
    //repositioning foot ground
    if(fg.x<137){
        fg.x=fg.width/2;
    }

    //bird move
    if(keyDown("space")){
       bird.y-bird.y - 15; 
    }
    else{
        bird.velocity.Y = 5;
    }

    pipe_move();

    if(frameCount%75===0){
        score++;
    }

    //game end
    if (bird.isTouching(pipe1Group)|| bird.isTouching(pipe2Group)){
        gameState = END;
    }
    if(bird.isTouching(fg)){
        gameState = END;

        }
    }
     else if (gameState===END){
            fg.velocityX = 0;
        bird.velocity = false;
        bird.x=25;
        bird.y=256;
        pipe1Group.setVelocityXEach(0);
        pipe2Group.setVelocityXEach(0);
        pipe1Group.setLifetimeEach(-1);
        pipe2Group.setLifetimeEach(-1);
        restart.visible=true;
        }
        if(mousePressedOver(restart)){
            reset();
        }
}



drawSprites();

textSize(30);
text("Score:" + score, 170,500);



function pipe_move(){
if(frameCount%75===0){
    pipe1=createSprite(144,0,10,10);
    pipe1.addImage(pipeNorth_image);
    pipe1.y=random(0,50);
    pipe1.velocityX=-2;
    pipe1Group.add(pipe1);
    pipe1Group.setLifetimeEach(144);

    pipe2=createSprite(144,512,10,10);
    pipe2.addImage(pipeSouth_image);
    pipe2.y=random(462,512);
    pipe2.velocityX=-2;
    pipe2Group.add(pipe2);
    pipe2Group.setLifetimeEach(144);
}

}

function reset(){
    gameState=PLAY;
    pipe1Group.destroyEach();
    pipe2Group.destroyEach();
    score = 0;
    bird.visible=true;
    restart.visible=false;
}