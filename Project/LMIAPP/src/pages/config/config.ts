import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the ConfigPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

data: DataProvider;
tmpName: string;
tmpEst:number;
tmpTest:number
tmpCara:number
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataExt: DataProvider) {
  	this.data=dataExt;
  	this.tmpName=this.data.examinator;
  	this.tmpEst=this.data.timeEstimul;
  	this.tmpTest=this.data.timeTest;
  	this.tmpCara=this.data.timeTestPostClick;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }
  clickSubmit(){
  	this.data.examinator=this.tmpName;
  	this.data.timeEstimul=this.tmpEst;
  	this.data.timeTest=this.tmpTest;
  	this.data.timeTestPostClick=this.tmpCara;
  	this.navCtrl.setRoot(HomePage);

  }

}
