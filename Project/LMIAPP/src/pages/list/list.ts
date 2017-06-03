import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';
import { HomePage } from '../../pages/home/home';
import { CreateUserPage } from '../../pages/create-user/create-user';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  dataUser: Array<{
    id: string, 
    name: string,
    lastname: string,
    birthday: Date,
    test: Array<void>
    }>;

  data: DataProvider;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataExt: DataProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.data=dataExt;
    this.dataUser=dataExt.userData;
    // Let's populate this page with some filler content for funzies
        
  }

  itemTapped(event, id) {
    let index:number;
    for (var i = 0; i < this.dataUser.length; i++) {
        if (id === this.dataUser[i].id) {
            index = i;
            break;
        }
    }
    this.data.actualUserIndex=index;//TODO
    this.navCtrl.setRoot(HomePage);
  }
  createUser(event) {
    this.navCtrl.push(CreateUserPage);
  }
}
