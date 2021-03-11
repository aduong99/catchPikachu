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
var assets = ['pikachu.png', 'pikachu2.png', 'pikachu4.png', 'pikachu3.png'];
var pikaSound;
var forest;

//Preload code
function preload(){

  for ( var i = 0; i < assets.length; i++ ) {
    pikachuImg[i] = loadImage('assets/' + assets[i]);
  }

  pokeball = loadImage('assets/pokeball.png');

  forest = loadImage('assets/forest.jpg');

  pikaSound = loadSound('assets/pikachuSound.mp3');
  teamRocketSound = loadSound('assets/teamRocket.mp3')
}

//Setup code
function setup() {
  createCanvas(windowWidth, windowHeight);

  simpleTimer = new Timer(1500);
  simpleTimer.start();

  makePikaButton();

  textAlign(CENTER);
  textSize(40);
  textFont('Futura');
 }

//Draw code
function draw() {
  background(forest);


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
    frameRate(0.2);
  }
  else {
    fill(0);
    text("A Wild Pikachu Appears!", width/2, height/6);
    text('Click To Catch Pikachu Before Time Runs Out!', width/2, height/6 + 50);
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