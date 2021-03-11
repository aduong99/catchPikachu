/************************************************
  Catch Pikachu
  by An Duong

  Uses clickable.p5 and timer.p5 functions to catch a wild Pikachu!
------------------------------------------------
************************************************/


//Global variables
var simpleTimer;
var waitForClick = true;
var pikaButton;
var pikachuImg = [];
var pikaSound;

//Preload code
function preload(){
  pikachuImg[0] = loadImage('assets/pikachu.png');
  pikachuImg[1] = loadImage('assets/pikachu2.png');
  pikachuImg[2] = loadImage('assets/pikachu4.png');
  pikachuImg[3] = loadImage('assets/pikachu3.png');

  pokeball = loadImage('assets/pokeball.png');

  pikaSound = loadSound('assets/pikachuSound.mp3');
  teamRocketSound = loadSound('assets/teamRocket.mp3')
}

//Setup code
function setup() {
  createCanvas(windowWidth, windowHeight);

  simpleTimer = new Timer(1000);
  simpleTimer.start();

  makePikaButton();

  textAlign(CENTER);
  textSize(40);
  textFont('Futura');
 }

//Draw code
function draw() {
  background(200,200,100);


  frameRate(60);

  if( waitForClick ) {
      fill(0);
      text("Pika? Pika! Pika!", width/2, height/6); 
  }  
  else {
    updateTimer();
  }
    
  pikaButton.draw();

  noCursor();
  image(pokeball, mouseX, mouseY);
}

function updateTimer() {
  if( simpleTimer.expired() ) {
    fill(0);
    pikaButton.image = pikachuImg[3];
    teamRocketSound.play();
    text("Oh! Too Late! Back To The Wild!", width/2, height/6);
    waitForClick = true;
    frameRate(0.5);
  }
  else {
    fill(0);
    text("A Wild Pikachu Appears!", width/2, height/5);
    text('Click To Catch Pikachu Before Time Runs Out!', width/2, height/5 + 50);
  }
}

//Button design
function makePikaButton() {

  pikaButton = new Clickable();

  pikaButton.image = pikachuImg[0];
    
  pikaButton.locate(width/2 - (pikaButton.width * 2), height/2 - (pikaButton.height * 4));
    
  pikaButton.width = 480;
  pikaButton.height = 480;
    
  pikaButton.color = "#00000000";
  pikaButton.stroke = "#00000000"; 
  pikaButton.text = " ";

  pikaButton.onPress = pikaButtonPressed;
  pikaButton.onHover = pikaButtonHover;
  pikaButton.onOutside = pikaButtonOutside;
  pikaButton.onRelease = pikaButtonAway;
}

//Button states
pikaButtonPressed = function () {
  pikaButton.image = pikachuImg[2];
  pikaSound.play();
}

pikaButtonHover = function () {
  pikaButton.image = pikachuImg[1];
}

pikaButtonOutside = function () {
  pikaButton.image = pikachuImg[0];
}

pikaButtonAway = function () {
  pikaButton.image = pikachuImg[1];
  waitForClick = false;
  simpleTimer.start();
}