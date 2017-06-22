import {Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, App, MenuController } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';
import { EstimulPage } from '../../pages/estimul/estimul';
import { EndTestPage } from '../../pages/end-test/end-test';

declare var Phaser;
declare const math: any;
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


  constructor(public navCtrl: NavController, public navParams: NavParams,  public dataExt: DataProvider, public appCtrl: App, public menu: MenuController) {
  	this.data=dataExt;
  	console.log("Hi there");
  	if (this.data.actualTestId === 0) {
        this.data.correctAnswers = 0;
        this.data.correctAnswersAll= 0;
    }
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    
    this.PhaserGame();
    
  }
  


  PhaserGame(){
    let time_inicial = new Date();
    let listPoint = [];
    let timePoint = new Date();
    let answered= false;
    let estimulView= true;
    let endTestTimeout;
    let TIMES = {
        HOLD: 150,
        SWIPE: 250
    };
    let phaserElement = this.phaserElement.nativeElement;
  	let MainGame = {
  		endLevel:()=> {
  			listPoint = [];
          if (this.data.actualTestId === 0) {
            this.data.correctAnswers  = 0;
          }
	        if ((this.data.actualTestId % 4 === 0) && (this.data.actualTestId != 0)) {
	            if (this.data.actualTestId === 16) {
	            	  this.navCtrl.setRoot(EndTestPage);

	                //$state.go('app.endTest', { testId: (parseInt($stateParams.testId)), correct: (parseInt(0)) });
	            } else if (this.data.correctAnswers  > 0) {
	                this.data.correctAnswers  = 0;
	                this.data.actualTestId++;
	                MainGame.recreateEstimul();
	            } else {
	            	this.navCtrl.setRoot(EndTestPage);
	            }
	        } else {
	            this.data.actualTestId++;
	            MainGame.recreateEstimul();
	        }
	    },
      dot:(d1,d2)=>{
          return (d1[0]*d2[0] + d1[1]*d2[1])/(Math.sqrt(d1[0]*d1[0]+d1[1]*d1[1])*Math.sqrt(d2[0]*d2[0]+d2[1]*d2[1]));

      },
      distance:(d1,d2)=>{
          return Math.sqrt((d1[0]-d2[0])*(d1[0]-d2[0]) + (d1[1]-d2[1])*(d1[1]-d2[1]));

      },
  		preload:()=>{
        	let i =0;
          for (let elem of this.data.testImages) {
            phaser.load.image('testRef'+i, 'assets/img/' + elem["testRef"]);
            phaser.load.image('testImg'+i, 'assets/img/' + elem["testImg"]);
            phaser.load.image('estimRef'+i, 'assets/img/' + elem["estimRef"]);
            phaser.load.image('estimImg'+i, 'assets/img/' + elem["estimImg"]);
            console.log('estimRef'+i);
            i++;
          }

  		},
  		create:()=>{

        phaser.stage.backgroundColor = '#ffffff';
        this.data.listGestures = [];
        this.data.startTest= new Date();
        this.data.countTouch=0;
        this.data.countEstimulo=0;
        //faceimage.input.pixelPerfectClick = true;
        phaser.bmdRef = phaser.make.bitmapData(phaser.width, phaser.height);
        phaser.bmdRef.draw('estimRef'+this.data.actualTestId, (phaser.width-phaser.height)/2, 0, phaser.height, phaser.height);
        phaser.bmdRef.update();
        phaser.bmdRef.addToWorld();
        console.log("ererwe");
        phaser.bmdImg = phaser.make.bitmapData(phaser.width, phaser.height);
        phaser.bmdImg.draw('estimImg'+this.data.actualTestId, (phaser.width-phaser.height)/2, 0, phaser.height, phaser.height);
        phaser.bmdImg.update();
        phaser.bmdImg.addToWorld();
        time_inicial = new Date();
        listPoint = [];
        timePoint = new Date();
        answered= false;
        estimulView= true;
        endTestTimeout = setTimeout(function () {
            //pocessGesture();
            MainGame.loadTest();
        }, this.data.timeEstimul);
        console.log('estimRef'+this.data.actualTestId);
        console.log('estimImg'+this.data.actualTestId);
        


      },
      recreateEstimul:()=>{

        phaser.stage.backgroundColor = '#ffffff';
        phaser.bmdRef.clear();
        phaser.bmdImg.clear();
        if(this.data.actualTestId>=15){
          phaser.bmdRef.draw('estimRef'+this.data.actualTestId, (phaser.width-928 * 1.1)/2, (phaser.height-400*1.1)/2, 928 * 1.1, 400*1.1);
          phaser.bmdImg.draw('estimImg'+this.data.actualTestId, (phaser.width-928 * 1.1)/2, (phaser.height-400*1.1)/2, 928 * 1.1, 400*1.1);
        }else{
          phaser.bmdRef.draw('estimRef'+this.data.actualTestId, (phaser.width-phaser.height)/2, 0, phaser.height, phaser.height);
          phaser.bmdImg.draw('estimImg'+this.data.actualTestId, (phaser.width-phaser.height)/2, 0, phaser.height, phaser.height);
        }
        phaser.bmdRef.update();
        phaser.bmdRef.addToWorld();
        console.log("ererwe");
        phaser.bmdImg.update();
        phaser.bmdImg.addToWorld();
        time_inicial = new Date();
        listPoint = [];
        timePoint = new Date();
        answered= false;
        estimulView= true;
        endTestTimeout = setTimeout(function () {
            //pocessGesture();
            MainGame.loadTest();
        }, this.data.timeEstimul);
        console.log('estimRef'+this.data.actualTestId);
        console.log('estimImg'+this.data.actualTestId);


      },
      loadTest:()=>{

        phaser.stage.backgroundColor = '#ffffff';
        phaser.bmdRef.clear();
        phaser.bmdImg.clear();
        
        phaser.bmdRef.draw('testRef'+this.data.actualTestId, 0, 0, phaser.width, phaser.height);
        phaser.bmdRef.update();
        phaser.bmdRef.addToWorld();
        phaser.bmdImg = phaser.make.bitmapData(phaser.width, phaser.height);
        phaser.bmdImg.draw('testImg'+this.data.actualTestId, 0, 0, phaser.width, phaser.height);
        phaser.bmdImg.update();
        phaser.bmdImg.addToWorld();
        time_inicial = new Date();
        listPoint = [];
        timePoint = new Date();
        answered= false;
        estimulView= false;
        endTestTimeout = setTimeout(function () {
            //pocessGesture();
            MainGame.endLevel();
        }, this.data.timeTest);
        console.log('testRef'+this.data.actualTestId);
        console.log('testRef'+this.data.actualTestId);


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
        let last= listPoint.length - 1;
        console.log(listPoint[last].positionDown.x);
        console.log(listPoint[last].positionUp.x);
        let vectrolinea=[listPoint[last].positionUp.x - listPoint[last].positionDown.x, listPoint[last].positionUp.y -listPoint[last].positionDown.y];
        console.log(vectrolinea);
        let p3lin=[listPoint[last].positionDown.x + vectrolinea[0]*0.5,listPoint[last].positionDown.y + vectrolinea[1]*0.5];
        console.log(p3lin);
        let p3curv=[listPoint[Math.trunc(last*0.5)].position.x, listPoint[Math.trunc(last*0.5)].position.y];
        
        let vectrolinea2=[p3curv[0] - listPoint[last].positionDown.x, p3curv[1]-listPoint[last].positionDown.y];
        console.log(MainGame.dot(vectrolinea,vectrolinea2)  );
        if(MainGame.dot(vectrolinea,vectrolinea2)<0.75 ){
        
            return "Curve";   
        }
        return "Stroke";
      },
      pocessGesture:()=>{
        let touchDuration = ((new Date()).getTime() - timePoint.getTime());
        let place = "otro";
        let tmp = MainGame.containsSprite(listPoint[0].positionDown);
        let answer = "0";
        if (tmp === 2) {
          if(!estimulView){
            place = "cuerpo";
          }else{
            place = "ojos";
          }
        } else if (tmp === 1) {
        	place = "cara";
        	if((!answered) && (!estimulView)){
	            answer = "1";
	            MainGame.listenerFace();
	            this.data.correctAnswers++;
          		this.data.correctAnswersAll++;
          		answered=true;
          }
          answer = "1";
        }
        let touch;
        if(!estimulView){
          touch = {
              "idLevel": this.data.actualTestId ,
              "idTouch":this.data.countTouch, 
              "gesture": MainGame.detectGesture(touchDuration),
              "duration": touchDuration,
              "place": "t" + "-" + place,//Generalizacion test 
              "timeE": (this.data.timeEstimul + (timePoint.getTime() - time_inicial.getTime())),
              "answer": answer
          };
        }else{
        this.data.countEstimulo++;  
          touch = {
            "idLevel": this.data.actualTestId ,
            "idTouch": this.data.countTouch,
            "gesture": MainGame.detectGesture(touchDuration),
            "duration": touchDuration,
            "place": "e" + "-" + place,//Generalizacion estimulo
            "timeE": (timePoint.getTime() - time_inicial.getTime()),
            "answer": 'na'
        };
        }
        listPoint = [];
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
            
            listPoint.push(phaser.input.activePointer);
            MainGame.pocessGesture();
            listPoint = [];

        }

      }

  	};
  	
    let phaser = new Phaser.Game(phaserElement.offsetWidth,phaserElement.offsetHeight,Phaser.CANVAS,phaserElement);
    phaser.state.add('MainGame',MainGame);
    phaser.state.start('MainGame');


  }

}
