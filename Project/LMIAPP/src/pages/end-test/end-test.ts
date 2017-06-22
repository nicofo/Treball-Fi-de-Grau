import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';    

import { DataProvider } from '../../providers/data/data';
import { File } from '@ionic-native/file';


import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the EndTestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-end-test',
  templateUrl: 'end-test.html',
})
export class EndTestPage {
	public listGestures: Array<{
	      "idLevel": number,
	      "idTouch": number,
	      "gesture": string,
	      "duration": number,
	      "place": string,
	      "timeE": number,
	      "answer": string
	  }>= [];

	public user: {
  	id: string, 
  	name: string,
  	lastname: string,
  	birthday: string,
  	tests: Array<String>,
  	results: String
  	};
  	public data: DataProvider;
  	public endDate: Date= new Date();
  constructor(public navCtrl: NavController, public navParams: NavParams,  public dataExt: DataProvider, public file: File, private alertCtrl: AlertController) {
  	this.listGestures=dataExt.listGestures;
  	this.user=dataExt.userData[dataExt.actualUserIndex];
  	this.data= dataExt;
  	
  }
  monthDiff(d1: Date, d2:Date) {
    var months;
    console.log(d1);
    console.log(d2);
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad EndTestPage');
  }
  saveCSV(event){
      console.log('HI');
  		let len=this.listGestures.length;
      console.log('len'+len);
      console.log(new Date());
  		let mesesEdad= this.monthDiff(new Date(this.user.birthday), this.data.startTest);
      console.log('HI');
      console.log('mesesEdad '+mesesEdad);
  		let today=this.data.startTest.getDate()+"-"+(this.data.startTest.getMonth()+1)+"-"+this.data.startTest.getFullYear()+" "+this.data.startTest.getHours()+":"+this.data.startTest.getMinutes();
      console.log('HI');
      console.log('today'+today);
      console.log('today'+today);
      console.log('today'+this.data.startTest.getTime());
      console.log('HI');
  		let tiempo= Math.trunc((this.endDate.getTime() -this.data.startTest.getTime())/1000);
      console.log('HI');
      console.log('tiempo'+tiempo);
  		let tiempoMedio=tiempo/(this.data.actualTestId+1);
      console.log('HI');
  		let dades="ID; N. meses edad; Dia prueba; ID prueba;Quien;Gesto;Nivel;Secuencia touch;Duracion touch;Zona touch;Tiempo desde estimulo; Respuesta";
  		let actualTest=0;
  		let timeTest=this.data.timeEstimul+this.data.timeTest;
  		let sumDes=0;
  		let sumTCara=0;
  		let sumTOjos=0;
  		let sumTOtro=0;
  		let estPrimero=this.listGestures[0].timeE;
  		let estSum=0;
  		let sumPress=0;
  		let sumTap=0;
  		let sumStroke=0;
      console.log('Variables');
  		for (let elem of this.listGestures) {


  			dades+="\n"+this.user.id+";"+mesesEdad+";"+today+";"+"recaras"+";"+this.data.examinator+";"+elem.gesture+";"+elem.idLevel+";"+elem.idTouch+";"+elem.duration+";"+elem.place+";"+elem.timeE+";"+elem.answer;
  			if(elem.answer === "0"){
  				timeTest=elem.timeE;
  			}
  			if(actualTest!=elem.idLevel ){
  				estSum+= elem.timeE;
  				sumDes=timeTest-tiempoMedio;
  				timeTest=this.data.timeEstimul+this.data.timeTest;
          actualTest=elem.idLevel;
  			}
  			if(elem.place==="t-cara"){
  				sumTCara++;
  			}
  			if(elem.place==="e-ojos"){
  				sumTOjos++;
          console.log("+ ojos"+sumTOjos);
  			}
  			if((elem.place==="t-otro") || (elem.place==="e-otro")){
  				sumTOtro++;
  			}
  			if(elem.gesture==="Tap"){
  				sumTap++;
  			}
  			if(elem.gesture==="Press"){
  				sumPress++;
  			}
  			if(elem.gesture==="Stroke"){
  				sumStroke++;
  			}
        console.log('gesture'+elem.gesture);

  		}
  		sumDes=timeTest-tiempoMedio;


  		let filename=this.user.id+"_"+this.data.startTest.getDate()+"-"+(this.data.startTest.getMonth()+1)+"-"+this.data.startTest.getFullYear();
      //this.data.saveData(filename, dades);
      this.file.writeFile(this.file.documentsDirectory,filename+".csv",dades);
  		this.data.userData[this.data.actualUserIndex].tests.push(filename);
  		this.listGestures=[];
  		dades="";
      console.log('guardar gesture '+this.file.documentsDirectory+filename);

  		//esults:"ID;n meses edad;ID prueba;Quien;Inicio;Fin;Duracion;D. Media;DS D.;P;PC;E;T. Test;T. Ojos;T. Cara;T. Otro;Tiempo Primer T;Tiempo medio;Tap;Press;Stroke"
  		let later=this.endDate.getDate()+"-"+(this.endDate.getMonth()+1)+"-"+this.endDate.getFullYear()+" "+this.endDate.getHours()+":"+this.endDate.getMinutes();
  		let  min= Math.trunc(tiempo/60);

  		this.data.userData[this.data.actualUserIndex].results+="\n"+this.user.id+ ";"+mesesEdad+";"+"recaras"+";"+this.data.examinator+";"+today+";"+later+";"+min+":"+(tiempo - min*60)+";"+tiempoMedio+";"+(Math.sqrt(sumDes/this.data.actualTestId))+";"+this.data.correctAnswersAll+";"+this.puntuacion(mesesEdad)+";"+((len-this.data.countEstimulo- sumTCara)/(this.data.actualTestId + 1))+";"+((len-this.data.countEstimulo)/(this.data.actualTestId + 1))+";"+(sumTOjos*100/this.data.countEstimulo)+";"+(sumTCara/(len-this.data.countEstimulo))+";"+(sumTOtro/len)+";"+estPrimero+";"+(estSum/(this.data.actualTestId + 1))+";"+(sumTap*100/len)+";"+(sumPress*100/len)+";"+(sumStroke*100/len);
      filename=this.user.id;
      console.log(this.data.userData[this.data.actualUserIndex].results);
      //this.data.saveData(filename, this.data.userData[this.data.actualUserIndex].results);
      this.file.writeFile(this.file.documentsDirectory,filename+".csv",this.data.userData[this.data.actualUserIndex].results);
      this.data.saveUsers();
      console.log('guardar gesture');
      this.navCtrl.setRoot(HomePage);
  }
  dontSave(event){
    let alert = this.alertCtrl.create({
      title: 'Confirm quit',
      message: 'Do you want to quit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: "Don't save",
          handler: () => {
            this.listGestures=[];
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();
  
    

  }
  puntuacion(mesesEdad){
  	if(mesesEdad >= (6*12)){
  		return 11;
  	}else if(mesesEdad >= (5*12 + 3)){
  		return 10;
  	}else if(mesesEdad >= (4*12 + 6)){
  		return 9;
  	}else if( mesesEdad >= (4*12 )){
  		return 8;
  	}else if( mesesEdad >= (3*12 + 6)){
  		return 7;
  	}else if( mesesEdad >= (3*12 + 3)){
  		return 6;
  	}else if(mesesEdad >= (3*12) ){
  		return 5;
  	}else if( mesesEdad >= (2*12 + 9)){
  		return 4;
  	}else if( mesesEdad >= (2*12 + 6)){
  		return 3;
  	}else{
  		return 2;
  	}

  }

}
