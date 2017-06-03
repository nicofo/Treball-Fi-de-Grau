import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';


/**
 * Generated class for the CreateUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html'
})
export class CreateUserPage {
  user: {
  	name: string,
  	lastname: string,
  	birthday: Date
  	};
  data: DataProvider;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataExt: DataProvider) {
  	this.data=dataExt;
  	this.user={
  	name: '',
  	lastname: '',
  	birthday: new Date()
  	};
  }

  
  logForm() {
    console.log(this.user);
    let bday = new Date(this.user.birthday);
    let id = bday.getDay() + bday.getMonth() + this.user.name.charAt(0) + this.user.name.charAt(1) + this.user.lastname.charAt(0) + this.user.lastname.charAt(1);
    
    this.data.userData.push({
    	id: id,
    	name: this.user.name,
    	lastname: this.user.lastname,
    	//dia,mes,ano
    	birthday:this.user.birthday,
    	test:[]
    });
    console.log(JSON.stringify({
    	id: id,
    	name: this.user.name,
    	lastname: this.user.lastname,
    	birthday:this.user.birthday,
    	test:[]
    }));	
    this.navCtrl.pop();
  }

}
