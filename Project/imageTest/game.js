




var game = new Phaser.Game((window.innerHeight*1620)/1080 , window.innerHeight, Phaser.CANVAS, 'gameArea', { preload: preload, create: create, update: update, render: render,eventstapped: eventHandler });

var text;
var counterBack = 0;
var counterFace = 0;
var onSwipe,onTap,onHold;
var swipeDispatched,holdDispatched,isTouching,isHolding;
var TIMES = {
    HOLD: 150,
    SWIPE: 250
};

function preload () {
    game.load.image('background', 'test1.png');
    game.load.image('face', 'test1over.png');
    

}
var faceimage, bmdFace, background;
function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen and assign it to a variable
    bmdBack = game.make.bitmapData(game.width , game.height);
    bmdBack.draw('background', 0,0,game.width , game.height);
    bmdBack.update();
    bmdBack.addToWorld();
    bmdFace = game.make.bitmapData(game.width , game.height);
    bmdFace.draw('face', 0,0,game.width , game.height);
    bmdFace.update();
    bmdFace.addToWorld();

    /*var backimage = game.add.sprite(game.world.centerX  , game.world.centerY, 'background');

    //  Moves the image anchor to the middle, so it centers inside the game properly
    //backimage.anchor.set(0.5);
    backimage.x = 0;
    backimage.y = 0;
    backimage.height = game.height;
    backimage.width = game.width;
    backimage.smoothed = false;
    //  Enables all kind of input actions on this image (click, etc)
    backimage.inputEnabled = true;*/
    /*
    faceimage = game.add.sprite(game.world.centerX, game.world.centerY, 'face');

    //faceimage.anchor.set(0.5);
    faceimage.x = 0;
    faceimage.y = 0;
    faceimage.height = game.height;
    faceimage.width = game.width;
    faceimage.smoothed = false;
    faceimage.inputEnabled = true;
    */

    onSwipe = new Phaser.Signal();
    onTap = new Phaser.Signal();
    onHold = new Phaser.Signal();
    swipeDispatched = false;
    holdDispatched = false;

    isTouching = false;
    isHolding = false;

    //faceimage.input.pixelPerfectClick = true;

    text = game.add.text(250, 16, '', { fill: '#00ff00' });

    onTap.add(tapped, this);   
    onHold.add(holded, this);   
    onSwipe.add(swiped, this);

    //backimage.events.onInputDown.add(listenerBack, this);
    //faceimage.events.onInputDown.add(listenerFace, this);
    
}
function eventHandler(e, position){
  console.log(e+" "+ position);
}
function tapped(e, position){
  text.text =(containsSprite(position)+" tap! ");
}
function holded(e, position){
  text.text =(containsSprite(position)+" hold! ");
}
function swiped(e, position){
  text.text =(containsSprite(position)+" swip! ");
}
function containsSprite(position){
    //console.log(""+faceimage.getBounds().contains(position.x, position.y)+", "+faceimage.getBounds().contains(game.input.x, game.input.y));
    /*if (faceimage.contains(position))
    {
        return 'e.Cara';
    }
    return "e.Otro";
    */
    col = bmdFace.getPixel(position.x, position.y);
    if (col.a > 0){
        return 'e.Cara';
    }
    return "e.Otro";

}
function updateSwipe(distance, duration) {
    if (duration === -1) {
        this.swipeDispatched = false;
    } else if (!this.swipeDispatched && distance > 150 &&  duration > 100 ) {
        var positionDown = this.game.input.activePointer.positionDown;
        this.onSwipe.dispatch(this, positionDown);

        swipeDispatched = true;
    }
}

function updateTouch(distance, duration) {
    var positionDown = this.game.input.activePointer.positionDown;

    if (duration === -1) {
        if (isTouching) {
            onTap.dispatch(this, positionDown);
        }

        isTouching = false;
        isHolding = false;
        holdDispatched = false;

    } else if (distance < 10) {
        if (duration < TIMES.HOLD) {
            isTouching = true;
        } else {
            isTouching = false;
            isHolding = true;

            if (!this.holdDispatched) {
                holdDispatched = true;

                onHold.dispatch(this, positionDown);
            }
        }
    } else {
        isTouching = false;
        isHolding = false;
    }
}
function update(){
    var distance = Phaser.Point.distance(this.game.input.activePointer.position, this.game.input.activePointer.positionDown);
    var duration = this.game.input.activePointer.duration;
    console.log("hi");
    updateSwipe(distance, duration);
    updateTouch(distance, duration);

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

    
    //game.debug.geom(faceimage.input._tempPoint);
    game.debug.text(game.input.x + ' x ' + game.input.y, 32, 32);

}