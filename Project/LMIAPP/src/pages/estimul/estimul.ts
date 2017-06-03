import {Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';
import { TestPage } from '../../pages/test/test';

declare var Phaser;

/**
 * Generated class for the EstimulPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-estimul',
  templateUrl: 'estimul.html',
})
export class EstimulPage {

  @ViewChild('phaser') phaserElement: ElementRef;
  private data: DataProvider;



  constructor(public navCtrl: NavController, public navParams: NavParams,  public dataExt: DataProvider) {
  	this.data=dataExt;
    if (this.data.actualTestId === 0) {
        this.data.listGestures = [];
        this.data.startTest= new Date();
        this.data.countTouch=0;
        
    }
    
  }

  ionViewDidLoad() {
    
    this.PhaserGame();
    
  }

  PhaserGame(){
    let time_inicial = new Date();
    let listPoint = [];
    let timePoint = new Date();

    let TIMES = {
        HOLD: 150,
        SWIPE: 250
    };
    let phaserElement = this.phaserElement.nativeElement;
    let bmdRef, bmdImg;
  	let MainGame = {

  		preload:()=>{
        console.log(this.data.testImages[this.data.actualTestId]["estimRef"]);
        console.log(this.data.testImages[this.data.actualTestId]["estimImg"]);
  			phaser.load.image('reference', 'assets/img/' + this.data.testImages[this.data.actualTestId]["estimRef"]);
        phaser.load.image('image', 'assets/img/' + this.data.testImages[this.data.actualTestId]["estimImg"]);

  		},
  		create:()=>{
        console.log("HEY");
        //  This creates a simple sprite that is using our loaded image and
        //  displays it on-screen and assign it to a variable
        phaser.stage.backgroundColor = '#ffffff'
        phaser.bmdRef = phaser.make.bitmapData(phaser.height*2, phaser.height);
        phaser.bmdRef.draw('reference', (phaser.width-phaser.height)/2, 0, phaser.height, phaser.height);
        phaser.bmdRef.update();
        phaser.bmdRef.addToWorld();
        phaser.bmdImg = phaser.make.bitmapData(phaser.height*2, phaser.height);
        phaser.bmdImg.draw('image', (phaser.width-phaser.height)/2, 0, phaser.height, phaser.height);
        phaser.bmdImg.update();
        phaser.bmdImg.addToWorld();
        
        //faceimage.input.pixelPerfectClick = true;

        //text = phaser.add.text(250, 16, '', { fill: '#00ff00' });
        console.log("Ya");


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
        if (tmp === 1) {
            place = "cara";
        } else if (tmp === 2) {
            place = "ojos";
        }
        let touch = {
            "idLevel": this.data.actualTestId ,
            "idTouch": this.data.countTouch,
            "gesture": MainGame.detectGesture(touchDuration),
            "duration": touchDuration,
            "place": "e" + "-" + place,//Generalizacion test estimulo
            "timeE": (timePoint.getTime() - time_inicial.getTime()),
            "answer": 'na'
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
    setTimeout(()=>{
        listPoint = [];
        phaser.destroy();
        this.navCtrl.setRoot(TestPage);
        console.log("BYE");
    },this.data.timeEstimul);

  }

}
