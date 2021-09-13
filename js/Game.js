class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(imgC1);
    car1.scale = 1.8
    car2 = createSprite(300,200);
    car2.addImage(imgC2);
    car2.scale = 1.8
    car3 = createSprite(500,200);
    car3.addImage(imgC3);
    car3.scale = 1.8
    car4 = createSprite(700,200);
    car4.addImage(imgC4);
    car4.scale = 1.8
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();

    player.getCarsAtEnd()

    if(allPlayers !== undefined){
      //var display_position = 100;
      background(ground);
      image(track,0,-displayHeight*10,displayWidth,displayHeight*11)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 250;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10)
          fill("yellow")
          ellipse(x,y,130,190)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=40
      player.update();
    }

    if(player.distance>9000){
      gameState = 2;
      player.rank = player.rank+1
      Player.updateCarsAtEnd(player.rank)
    }

    drawSprites();
  }

  End(){
    background("Orange")
    console.log("gameEnded");
    textSize(50)
    strokeWeight(4)
    text("YOUR GAME HAS ENDED",displayWidth/2,-displayHeight*10+500)
    text("YOUR RANK IS"+player.rank,displayWidth/2,-displayHeight*10+550)
    console.log(player.rank)
  }
}
