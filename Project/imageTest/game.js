




var game = new Phaser.Game((window.innerHeight*1620)/1080 , window.innerHeight, Phaser.CANVAS, 'gameArea', { preload: preload, create: create, update: update, render: render,eventstapped: eventHandler });

var text;
var counterBack = 0;
var counterFace = 0;
var onSwipe,onTap,onHold;
var swipeDispatched,holdDispatched,isTouching,isHolding;
var time_inicial=new Date();
var listPoint=[];
var timePoint=new Date();
var listGestures=[];
var TIMES = {
    HOLD: 150,
    SWIPE: 250
};

function preload () {
    game.load.image('reference', 'prova_01_B_gt_v2.png');
    game.load.image('image', 'prova_01_B.jpg');
    

}
var faceimage, bmdFace, background;
function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen and assign it to a variable
    bmdRef = game.make.bitmapData(game.width , game.height);
    bmdRef.draw('reference', 0,0,game.width , game.height);
    bmdRef.update();
    bmdRef.addToWorld();
    bmdImg = game.make.bitmapData(game.width , game.height);
    bmdImg.draw('image', 0,0,game.width , game.height);
    bmdImg.update();
    bmdImg.addToWorld();

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
    
    col = bmdRef.getPixel(position.x, position.y);
    if (col.r > 250){
        return 2;
    }if(col.g >250){
        return 1;
    }
    return 0;

}
/*
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
/*
function update(){
    var distance = Phaser.Point.distance(this.game.input.activePointer.position, this.game.input.activePointer.positionDown);
    var duration = this.game.input.activePointer.duration;
    console.log("hi");
    updateSwipe(distance, duration);
    updateTouch(distance, duration);
    console.log(this.game.input.activePointer.isDown);

}
*/
function detectGesture(touchDuration){ 
    var distance = Phaser.Point.distance(listPoint[listPoint.length - 1].position, listPoint[listPoint.length - 1].positionDown);
    if(distance< 10){
        if(touchDuration> TIMES.HOLD){
            return "Press";
        }else{
            return "Tap";
        }
    }
    /*if(){

    }if(){

    }*/
    return "Stroke";
}
function pocessGesture(){
    var touchDuration= (new Date() - timePoint);
    var place="otro";
    var answer=0;
    console.log(listPoint[0].position);
    var tmp=containsSprite(listPoint[0].positionDown);
    if(tmp === 1){
        place="cuerpo";
    }else if(tmp === 2){
        place="cara";
        answer=1;
    }
    var touch = {
      "gesture": detectGesture(touchDuration),
      "duration2": touchDuration,
      "place": "t"+"-"+place,//Generalizacion test estimulo
      "timeE": ( timePoint - time_inicial),
      "answer": answer
    };
    listGestures.push(touch);
    console.log("hi");
    console.log(listGestures);
}

function update(){
    if (this.game.input.activePointer.isDown){
        if(listPoint.length<=0){
            timePoint= new Date();
            listPoint.push(this.game.input.activePointer);
        }else{
           listPoint.push(this.game.input.activePointer); 
        }
    }else if(listPoint.length>0){

        pocessGesture();
        listPoint=[];

    }
    //console.log("hi");
    /*
    var distance = Phaser.Point.distance(this.game.input.activePointer.position, this.game.input.activePointer.positionDown);
    var duration = this.game.input.activePointer.duration;

    updateSwipe(distance, duration);
    updateTouch(distance, duration);
    */
}
/*
*/
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