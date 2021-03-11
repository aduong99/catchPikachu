/************************************************
PettingChi
  by Fiona Young
Overview – Demonstration on p5.clickable abilities with buttons while also incorporating p5.timer for a fun surprise.

------------------------------------------------
Notes: 
(1) Utilizes p5.timer.js and p5.clickable.js classes.
************************************************/


//Global variables
var simpleTimer;
var waitForClick = true;
var chiButton;
var chiImage = [];

//Preload code
function preload(){
  chiImage[0] = loadImage('assets/chiSit.png');
  chiImage[1] = loadImage('assets/chiHover.png');
  chiImage[2] = loadImage('assets/chiLove.png');
  chiImage[3] = loadImage('assets/chiNo.png');
}

//Setup code
function setup() {
  createCanvas(windowWidth, windowHeight);

  simpleTimer = new Timer(1000);
  simpleTimer.start();

  makeChiButton();
    
  textAlign(CENTER);
  textSize(20);
 }

//Draw code
function draw() {
  background(245);

  frameRate(60);

  if( waitForClick ) {
      fill(180);
      text("Hi, I'm Chi! Click to pet me :)", width/2, height/6); 
  }  
  else {
    updateTimer();
  }
    
  chiButton.draw();
}

function updateTimer() {
  if( simpleTimer.expired() ) {
    fill(180);
    chiButton.image = chiImage[3];
    text("NO, no pets!", width/2, height/6);
    waitForClick = true;
    frameRate(0.5);
  }
  else {
    fill(180);
    text("Hi, I'm Chi! Click to pet me :)", width/2, height/6);
  }
}

//Button design
function makeChiButton() {

  chiButton = new Clickable();

  chiButton.image = chiImage[0];
    
  chiButton.locate(width/2 - (chiButton.width * 2), height/2 - (chiButton.height * 4));
    
  chiButton.width = 400;
  chiButton.height = 400;
    
  chiButton.color = "#00000000";
  chiButton.stroke = "#00000000"; 
  chiButton.text = " ";

  chiButton.onPress = chiButtonPressed;
  chiButton.onHover = chiButtonHover;
  chiButton.onOutside = chiButtonOutside;
  chiButton.onRelease = chiButtonAway;
}

//Button states
chiButtonPressed = function () {
  chiButton.image = chiImage[2];
}

chiButtonHover = function () {
  chiButton.image = chiImage[1];
}

chiButtonOutside = function () {
  chiButton.image = chiImage[0];
}

chiButtonAway = function () {
  chiButton.image = chiImage[0];
  waitForClick = false;
  simpleTimer.start();
}