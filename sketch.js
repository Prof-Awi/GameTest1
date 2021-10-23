var RTankImg, BTankImg
var rTank, bTank
var RBarrelImg, BBarrelImg
var rBarrel, bBarrel
var database, gameState;
var bomb, bombImg
var form, player, playerCount, allPlayers, offsettotal
var wall, turn
var r1,r2, rotation, Bullet

var engine, world
var obstacles


var tanks = []
var tankBarrel = []

function preload(){
  RTankImg = loadImage("/Tanks/Red/Tank.png")
  BTankImg = loadImage("/Tanks/Blue/Tank.png")
  RBarrelImg = loadImage("/Tanks/Red/Barrel.png")
  BBarrelImg = loadImage("/Tanks/Blue/Barrel.png")
  bombImg = loadImage("Bomb.png")
  bombImg = loadImage("Bomb.png")
  backgroundImage = loadImage("background.jpg")
}



function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Matter.Engine.create();
  world = engine.world;
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  


}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

  if (gameState === 2) {
    game.showLeaderboard();
    game.end();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}