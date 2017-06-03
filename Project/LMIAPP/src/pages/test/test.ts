import {Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';
import { EstimulPage } from '../../pages/estimul/estimul';
import { EndTestPage } from '../../pages/end-test/end-test';

declare var Phaser;
/**
 * Generated class for the TestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  @ViewChild('phaser') phaserElement: ElementRef;
  private data: DataProvider;
  //private phaser: Phaser;


  constructor(public navCtrl: NavController, public navParams: NavParams,  public dataExt: DataProvider, public appCtrl: App	) {
  	this.data=dataExt;
  	console.log("Hi there");
  	if (this.data.actualTestId === 0) {
        this.data.correctAnswers = 0;
        this.data.correctAnswersAll= 0;
    }
       
  }

  ionViewDidLoad() {
    
    this.PhaserGame();
    
  }

  PhaserGame(){
    let time_inicial = new Date();
    let listPoint = [];
    let timePoint = new Date();
    let answered= false;
    let endTestTimeout;
    endTestTimeout = setTimeout(function () {
        //pocessGesture();
        MainGame.endLevel();
    }, this.data.timeTest);
    let TIMES = {
        HOLD: 150,
        SWIPE: 250
    };
    let phaserElement = this.phaserElement.nativeElement;
    let bmdRef, bmdImg;
  	let MainGame = {
  		endLevel:()=> {
  			listPoint = [];
	        if ((this.data.actualTestId % 4 === 0) && (this.data.actualTestId != 0)) {
	            if (this.data.actualTestId === 16) {
	            	this.appCtrl.getRootNav().setRoot(EndTestPage);
	                //$state.go('app.endTest', { testId: (parseInt($stateParams.testId)), correct: (parseInt(0)) });
	            } else if (this.data.correctAnswers  > 0) {
	                this.data.correctAnswers  = 0;
	                this.data.actualTestId++;
	                this.appCtrl.getRootNav().setRoot(EstimulPage);
	                //$state.go('app.pagea', { testId: (parseInt($stateParams.testId) + 1) });
	            } else {
	            	this.appCtrl.getRootNav().setRoot(EndTestPage);
	                //$state.go('app.endTest', { testId: (parseInt($stateParams.testId)), correct: (parseInt(-1)) });
	            }
	        } else {
	            this.data.actualTestId++;
	            this.appCtrl.getRootNav().setRoot(EstimulPage);
	        }
	    },
  		preload:()=>{
        	console.log(this.data.testImages[this.data.actualTestId]["testRef"]);
        	console.log(this.data.testImages[this.data.actualTestId]["testImg"]);
  			phaser.load.image('reference', 'assets/img/' + this.data.testImages[this.data.actualTestId]["testRef"]);
        	phaser.load.image('image', 'assets/img/' + this.data.testImages[this.data.actualTestId]["testImg"]);

  		},
  		create:()=>{

        //  This creates a simple sprite that is using our loaded image and
        //  displays it on-screen and assign it to a variable
        phaser.stage.backgroundColor = '#ffffff'
        phaser.bmdRef = phaser.make.bitmapData(phaser.width, phaser.height);
        phaser.bmdRef.draw('reference', 0, 0, phaser.width, phaser.height);
        phaser.bmdRef.update();
        phaser.bmdRef.addToWorld();
        phaser.bmdImg = phaser.make.bitmapData(phaser.width, phaser.height);
        phaser.bmdImg.draw('image', 0, 0, phaser.width, phaser.height);
        phaser.bmdImg.update();
        phaser.bmdImg.addToWorld();
        
        //faceimage.input.pixelPerfectClick = true;

        //text = phaser.add.text(250, 16, '', { fill: '#00ff00' });



      },
      listenerFace:()=> {

        clearTimeout(endTestTimeout);

        let endTestFaceTimeout = setTimeout(function () {
            //pocessGesture();
            console.log("Sucesss!!!!!!");
            MainGame.endLevel();
        }, this.data.timeTestPostClick);
        
        

      },
      containsSprite:(position)=>{

        let col = phaser.bmdRef.getPixel(position.x, position.y);
        if ((col.r > 50) && (col.r < 220)) {
            return 2;
        } if (col.r > 220) {
            return 1;
        }
        return 0;

      },
      detectGesture:(touchDuration)=>{
        let distance = Phaser.Point.distance(listPoint[listPoint.length - 1].position, listPoint[listPoint.length - 1].positionDown);
        if (distance < 40) {
            if (touchDuration > TIMES.HOLD) {
                return "Press";
            } else {
                return "Tap";
            }
        }
        /*if(){
    
        }if(){
    
        }*/
        return "Stroke";
      },
      pocessGesture:()=>{
        let touchDuration = ((new Date()).getTime() - timePoint.getTime());
        let place = "otro";
        let tmp = MainGame.containsSprite(listPoint[0].positionDown);
        let answer = "0";
        if (tmp === 2) {
            place = "cuerpo";
        } else if (tmp === 1) {
        	place = "cara";
        	if(!answered){
	            
	            answer = "1";
	            MainGame.listenerFace();
	            this.data.correctAnswers++;
        		this.data.correctAnswersAll++;
        		answered=true;
            }
        }
        var touch = {
            "idLevel": this.data.actualTestId ,
            "idTouch":this.data.countTouch, 
            "gesture": MainGame.detectGesture(touchDuration),
            "duration": touchDuration,
            "place": "t" + "-" + place,//Generalizacion test estimulo
            "timeE": (this.data.timeEstimul + (timePoint.getTime() - time_inicial.getTime())),
            "answer": answer
        };
        this.data.listGestures.push(touch);
        this.data.countTouch++;
        console.log(place+ " "+touch.gesture);
      },
      update:()=>{
        if (phaser.input.activePointer.isDown) {
            if (listPoint.length <= 0) {
                timePoint = new Date();
                listPoint.push(phaser.input.activePointer);
            } else {
                listPoint.push(phaser.input.activePointer);
            }
        } else if (listPoint.length > 0) {

            MainGame.pocessGesture();
            listPoint = [];

        }

      }

  	};
  	
    let phaser = new Phaser.Game(phaserElement.offsetWidth,phaserElement.offsetHeight,Phaser.AUTO,phaserElement);
    phaser.state.add('MainGame',MainGame);
    phaser.state.start('MainGame');


  }

}
