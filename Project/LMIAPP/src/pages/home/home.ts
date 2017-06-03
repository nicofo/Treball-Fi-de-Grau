import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { EstimulPage } from '../../pages/estimul/estimul';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	actualNumber: number;
	textBoton: string;
  constructor(public navCtrl: NavController, public dataExt: DataProvider) {
  	this.textBoton="";
  	this.actualNumber=dataExt.actualUserIndex;
    dataExt.actualTestId=0;
  	if(this.actualNumber=== -1){
  		this.textBoton="Not User Selected";
  	} else{
  		this.textBoton=" Start\n"+dataExt.userData[this.actualNumber].name;
  	}

  }
  startTest() {
    this.navCtrl.setRoot(EstimulPage);
  }

}
