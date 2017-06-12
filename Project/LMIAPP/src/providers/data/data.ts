import { Injectable} from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { File } from '@ionic-native/file';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataProvider {

  public userData:Array<{
    id: string, 
    name: string,
    lastname: string,
    birthday: Date,
    tests: Array<string>,
    results: string
    }>= [];

  public testImages: Array<{
      "estimRef": string,
      "estimImg": string,
      "testRef": string,
      "testImg": string
    }>;


  public actualUserIndex: number = -1;
  public actualTestId: number=0;
  public listGestures: Array<{
      "idLevel": number,
      "idTouch": number,
      "gesture": string,
      "duration": number,
      "place": string,
      "timeE": number,
      "answer": string
  }>= [];
  public startTest: Date;
  public timeEstimul:number=3000;
  public timeTest:number=3000;
  public timeTestPostClick:number=1000;
  public correctAnswers=0;
  public correctAnswersAll=0;
  public countTouch=0;
  public countEstimulo=0;
  constructor( private file: File, private toastCtrl: ToastController){
    this.testImages = [
      {
          "estimRef": "01A_GT.png",
          "estimImg": "01A.jpg",
          "testRef": "01B_GT.png",
          "testImg": "01B.jpg"
      },
      {
          "estimRef": "02A_GT.jpg",
          "estimImg": "02A.jpg",
          "testRef": "02B_GT.jpg",
          "testImg": "02B.jpg"
      },
      {
          "estimRef": "03A_GT.jpg",
          "estimImg": "03A.jpg",
          "testRef": "03B_GT.jpg",
          "testImg": "03B.jpg"
      },
      {
          "estimRef": "04A_GT.jpg",
          "estimImg": "04A.jpg",
          "testRef": "04B_GT.jpg",
          "testImg": "04B.jpg"
      },
      {
          "estimRef": "05A_GT.png",
          "estimImg": "05A.jpg",
          "testRef": "05B_GT.png",
          "testImg": "05B.jpg"
      },
      {
          "estimRef": "06A_GT.jpg",
          "estimImg": "06A.jpg",
          "testRef": "06B_GT.jpg",
          "testImg": "06B.jpg"
      },
      {
          "estimRef": "07A_GT.jpg",
          "estimImg": "07A.jpg",
          "testRef": "07B_GT.jpg",
          "testImg": "07B.jpg"
      },
      {
          "estimRef": "08A_GT.jpg",
          "estimImg": "08A.jpg",
          "testRef": "08B_GT.jpg",
          "testImg": "08B.jpg"
      },
      {
          "estimRef": "09A_GT.jpg",
          "estimImg": "09A.jpg",
          "testRef": "09B_GT.jpg",
          "testImg": "09B.jpg"
      },
      {
          "estimRef": "10A_GT.jpg",
          "estimImg": "10A.jpg",
          "testRef": "10B_GT.jpg",
          "testImg": "10B.jpg"
      },
      {
          "estimRef": "11A_GT.jpg",
          "estimImg": "11A.jpg",
          "testRef": "11B_GT.jpg",
          "testImg": "11B.jpg"
      },
      {
          "estimRef": "12A_GT.jpg",
          "estimImg": "12A.jpg",
          "testRef": "12B_GT.jpg",
          "testImg": "12B.jpg"
      },
      {
          "estimRef": "13A_GT.jpg",
          "estimImg": "13A.jpg",
          "testRef": "13B_GT.jpg",
          "testImg": "13B.jpg"
      },
      {
          "estimRef": "14A_GT.jpg",
          "estimImg": "14A.jpg",
          "testRef": "14B_GT.jpg",
          "testImg": "14B.jpg"
      },
      {
          "estimRef": "15A_GT.jpg",
          "estimImg": "15A.jpg",
          "testRef": "15B_GT.jpg",
          "testImg": "15B.jpg"
      },
      {
          "estimRef": "01A_GT.jpg",
          "estimImg": "01A.jpg",
          "testRef": "01B_GT.jpg",
          "testImg": "01B.jpg"
      }
    ];
    this.file.readAsText(this.file.documentsDirectory, "lmiUsers.json").then(fileStr => {
      console.log(fileStr);
      this.userData=  JSON.parse(fileStr);
      console.log(this.userData);
      let toast = this.toastCtrl.create({
        message: 'Load saved info',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
      
    }).catch(err => {
      let toast = this.toastCtrl.create({
        message: 'No saved',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    });

  }
  saveUsers(){
    this.file.writeFile(this.file.documentsDirectory,"lmiUsers.json",JSON.stringify(this.userData));
    

  }

}
