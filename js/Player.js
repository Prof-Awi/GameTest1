class Player {
    constructor() {
      this.name = null;
      this.index = null;
      this.rotation = 0
      this.offset = 0
      this.turn = 1
      this.shot = false
 
    }
  
    addPlayer() {
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        rotation: this.rotation,
        playerName: this.name,
        shot: this.shot
      });
    }



    getCount() {
      var playerCountRef = database.ref("playerCount");
      playerCountRef.on("value", data => {
        playerCount = data.val();
      });
    }

    updateShot(index,index2){
      var up = "players/player" + index
      database.ref(up).update({
        shot: true
      })
      var up2 = "players/player" + index2
      database.ref(up).update({
        shot: false
      })


    }

    getTurn(){
      var turnRef = database.ref("turn");
      turnRef.on("value", data => {
        turn = data.val();
      });
      
    }

    updateTurn(turn){
      database.ref("/").update({
        turn: turn
      })
    }
  
    updateCount(count) {
      database.ref("/").update({
        playerCount: count

      });
    }
  
    update() {
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).update({
        rotation: this.rotation
      });
    }
  
    static getPlayersInfo() {
      var playerInfoRef = database.ref("players");
      playerInfoRef.on("value", data => {
        allPlayers = data.val();
      });
    }
  

  }