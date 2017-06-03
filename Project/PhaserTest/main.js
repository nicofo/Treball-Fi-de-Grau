let phaserElement = document.getElementById('phaser');

    let bmdRef, bmdImg;
  	let MainGame = {

  		preload:()=>{
  			game.load.image('reference', 'assets/img/01A_GT.png' );
        game.load.image('image', 'assets/img/01A.jpg');

  		},
  		create:()=>{

        //  This creates a simple sprite that is using our loaded image and
        //  displays it on-screen and assign it to a variable
        game.bmdRef = game.make.bitmapData(game.width, game.height);
        game.bmdRef.draw('reference', 0, 0, game.width, game.height);
        game.bmdRef.update();
        game.bmdRef.addToWorld();
        game.bmdImg = game.make.bitmapData(game.width, game.height);
        game.bmdImg.draw('image', 0, 0, game.width, game.height);
        game.bmdImg.update();
        game.bmdImg.addToWorld();

        //faceimage.input.pixelPerfectClick = true;

        //text = game.add.text(250, 16, '', { fill: '#00ff00' });



      }

  	};
    let game = new Phaser.Game(phaserElement.offsetWidth,phaserElement.offsetHeight,Phaser.AUTO,phaserElement);
    game.state.add('MainGame',MainGame);
    game.state.start('MainGame');