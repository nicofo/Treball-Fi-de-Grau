




var game = new Phaser.Game((window.innerHeight*1620)/1080 , window.innerHeight, Phaser.CANVAS, 'gameArea', { preload: preload, create: create, update: function() { this.gestures.update();}, render: render,eventstapped: eventHandler });

var text;
var counterBack = 0;
var counterFace = 0;

function preload () {
    game.load.image('background', 'test1.png');
    game.load.image('face', 'test1over.png');
    

}
var faceimage
function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen and assign it to a variable
    var backimage = game.add.sprite(game.world.centerX  , game.world.centerY, 'background');

    //  Moves the image anchor to the middle, so it centers inside the game properly
    //backimage.anchor.set(0.5);
    backimage.x = 0;
    backimage.y = 0;
    backimage.height = game.height;
    backimage.width = game.width;
    backimage.smoothed = false;
    //  Enables all kind of input actions on this image (click, etc)
    backimage.inputEnabled = true;
    faceimage = game.add.sprite(game.world.centerX, game.world.centerY, 'face');

    //faceimage.anchor.set(0.5);
    faceimage.x = 0;
    faceimage.y = 0;
    faceimage.height = game.height;
    faceimage.width = game.width;
    faceimage.smoothed = false;
    faceimage.inputEnabled = true;


    faceimage.input.pixelPerfectClick = true;

    text = game.add.text(250, 16, '', { fill: '#000000' });
     this.gestures = new Gesture(this.game);
     this.gestures.onTap.add(this.tapped, this);   
     this.gestures.onHold.add(this.holded, this);   
     this.gestures.onSwipe.add(this.swiped, this);

    //backimage.events.onInputDown.add(listenerBack, this);
    //faceimage.events.onInputDown.add(listenerFace, this);
    
}
function eventHandler(e, position){
  console.log(e+" "+ position);
}

function listenerBack () {

    counterBack++;
    text.text = "You clicked " + counterFace + " on the face and "+counterBack+" in the background";

}
function listenerFace () {

    counterFace++;
    text.text = "You clicked " + counterFace + " on the face and "+counterBack+" in the background";

}
function render() {

    
    game.debug.geom(faceimage.input._tempPoint);

}