class Game {
    constructor() {
      this.resetTitle = createElement("h2");
      this.resetButton = createButton("");
      this.off = 0
      this.blast = false;
      this.shot = false
    }
  
    getState() {
      var gameStateRef = database.ref("gameState");
      gameStateRef.on("value", function(data) {
        gameState = data.val();
      });
    }
    update(state) {
      database.ref("/").update({
        gameState: state
      });
    }
  
    start() {
      player = new Player();
      playerCount = player.getCount();
      background("white")
      form = new Form();
      form.display();
  
      if(Math.random()>0.5){
        r1 = -0.2
      }else{
        r1 = 1
      }
      createCanvas(windowWidth,windowHeight);
      rTank = createSprite(width/4+(Math.random()*200*r1),height-50,1,1)
      rTank.addImage(RTankImg)
      rTank.scale = 0.5
      rTank.mirrorX(rTank.mirrorX()*-1)
    
      if(Math.random()>0.5){
        r2 = 1
      }else{
        r2 = -0.2
      }
      bTank = createSprite(width/4*3+(Math.random()*200*r2),height-50,1,1)
      bTank.addImage(BTankImg)
      bTank.scale = 0.5
    
      rBarrel = createSprite(rTank.x+10,rTank.y-30,1,1)
      rBarrel.addImage(RBarrelImg)
      rBarrel.scale = 0.5
      rBarrel.rotation = -30
      rBarrel.mirrorX(rBarrel.mirrorX()*-1)

    
      bBarrel = createSprite(bTank.x-10,bTank.y-30,1,1)
      bBarrel.addImage(BBarrelImg)
      bBarrel.scale = 0.5
      bBarrel.rotation = 30
      bBarrel.mirrorY = -1

      tankBarrel = [rBarrel,bBarrel]
      tanks = [rTank,bTank]

      
      wall = createSprite(width/2,height/2+100,50,height-100)

      obstacles = new Group()


    }

  
    handleElements() {
      form.hide();
      form.titleImg.position(40, 50);
      form.titleImg.class("gameTitleAfterEffect");
  
      //C39
      this.resetTitle.html("Reset Game");
      this.resetTitle.class("resetText");
      this.resetTitle.position(width/20*17.5, 80);
  
      this.resetButton.class("resetButton");
      this.resetButton.position(width/20*18.5, 20);
  

 
    }
  
    play() {
      this.handleElements();
      this.handleResetButton();  
      Player.getPlayersInfo();


      for(var i = 0;i < obstacles.length; i++){
        obstacles[i].display()
        obstacles[i].animate()

      }
      if (allPlayers !== undefined) {
  

        //index of the array
        var index = 0;
        for (var plr in allPlayers) {
          //add 1 to the index for every loop
          index = index + 1;

          
          var rot = allPlayers[plr].rotation;
          tankBarrel[index-1].rotation = rot
          
  

  
          //tankBarrel[index - 1].rotation = rotation;
          /*
          if (index === player.index) {
            
            this.handleObstacleCollision(index)
            // Changing camera position in y direction
          }
          */
        }
  

  
        // handling keyboard events
        this.handlePlayerControls();
  
  
        drawSprites();
        Matter.Engine.update(engine)
      }
    }
  
    handleResetButton() {
      this.resetButton.mousePressed(() => {
        database.ref("/").set({
          playerCount: 0,
          gameState: 0,
          offset: 0,
          turn:1,
          players: {},
        });
        window.location.reload();
      });
    }
  
  
    handlePlayerControls() {
      if (!this.blast) {
        if(player.index == 2){
          if (keyIsDown(UP_ARROW) && player.rotation < 100) {
            player.rotation += 1;
            tankBarrel[player.index-1].rotation +=1 
            player.update();
          }  
        
          if (keyIsDown(DOWN_ARROW) && player.rotation > -50) {
            player.rotation -= 1;
            tankBarrel[player.index-1].rotation -=1
            player.update();
          }
        }
        if(player.index == 1){
          if (keyIsDown(UP_ARROW) && player.rotation > -100) {
            player.rotation -= 1;
            tankBarrel[player.index-1].rotation -=1
            player.update();
          }  
        
          if (keyIsDown(DOWN_ARROW) && player.rotation < 50) {
            player.rotation += 1;
            tankBarrel[player.index-1].rotation +=1
            player.update();
          } 
        }
        player.getTurn()
        if(keyIsDown(32)){
          Bullet = new Ammo(tankBarrel[player.index-1].x,tankBarrel[player.index-1].y)
          Matter.Body.setAngle(Bullet.body, tankBarrel[player.index-1].rotation)
          if(player.index==1 && turn == 1){
            Bullet.shoot(1,player.index-1)
            player.updateTurn(2)
            player.updateShot(1,2)
            obstacles.push(Bullet)
          }if(player.index==2 && turn == 2){
          Bullet.shoot(-1,player.index-1) 
          player.updateTurn(1)
          obstacles.push(Bullet)
          player.updateShot(2,1)
          
        }

        }
      }
    }
    handleObstacleCollision(index) {
      if (tank[index-1].collide(obstacles)) {
        this.blast = true
        player.update();
      }
    }

    handleOpp(){
      if(player.index==1 && turn == 2 && allPlayers[plr].shot){
        Bullet = new Ammo(tankBarrel[2].x,tankBarrel[2].y)
        Matter.Body.setAngle(Bullet.body, tankBarrel[2].rotation)
        Bullet.shoot(-1,2)
      }
      if(player.index==2 && turn == 1 && allPlayers[plr].shot){
        Bullet = new Ammo(tankBarrel[1].x,tankBarrel[1].y)
        Matter.Body.setAngle(Bullet.body, tankBarrel[1].rotation)
        Bullet.shoot(1,1)

      }
    }
  

  
    showRank() {
      swal({
        title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
        text: "You reached the finish line successfully",
        imageUrl:
          "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
        imageSize: "100x100",
        confirmButtonText: "Ok"
      });
    }
  
    gameOver() {
      swal({
        title: `Game Over`,
        text: "Oops you lost the race....!!!",
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
    end() {
      console.log("Game Over");
    }
  }