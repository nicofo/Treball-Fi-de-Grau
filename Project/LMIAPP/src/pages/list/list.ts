import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';    

import { DataProvider } from '../../providers/data/data';
import { HomePage } from '../../pages/home/home';
import { CreateUserPage } from '../../pages/create-user/create-user';
import { File } from '@ionic-native/file';
import { EmailComposer } from '@ionic-native/email-composer';

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
    birthday: string,
    tests: Array<String>,
    results: String
    }>;

  data: DataProvider;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataExt: DataProvider, private file: File, private emailComposer: EmailComposer, private alertCtrl: AlertController) {
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
  editUser(event, id) {
    this.navCtrl.push(CreateUserPage);
  }
  removeUser(id) {
    
    let index:number;
    for (var i = 0; i < this.dataUser.length; i++) {
        if (id === this.dataUser[i].id) {
            index = i;
            this.data.userData.splice(index, 1);
            break;
        }
    }
    if (index === this.data.actualUserIndex) {
        this.data.actualUserIndex = -1;
    } else if (index < this.data.actualUserIndex) {
        this.data.actualUserIndex = this.data.actualUserIndex - 1;
    }
    this.data.saveUsers();
    
  }
  removeConfirm(event, id) {
  let alert = this.alertCtrl.create({
    title: 'Confirm remove',
    message: 'Confirm remove',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Remove',
        handler: () => {
          this.removeUser(id);
        }
      }
    ]
  });
  alert.present();
}
  onSendUser(event, id) {
    let index:number;
    for (var i = 0; i < this.dataUser.length; i++) {
        if (id === this.dataUser[i].id) {
            index = i;
            break;
        }
    }

    console.log("Hi");
    console.log("Hi inicial path "+ this.file.documentsDirectory);
    console.log("Hi inicial path "+ this.data.userData[index].id);
    var filesPaths:string[]; 
    //this.file.writeFile(this.file.documentsDirectory,this.data.userData[index].id+".csv",this.data.userData[index].results);
    filesPaths=[this.file.documentsDirectory+this.data.userData[index].id+".csv"];
    console.log("Hi inicial path "+ filesPaths);
    console.log("Hi inicial tests "+ this.data.userData[index].tests.length);
    for( var i=0; i<this.data.userData[index].tests.length; i++){
      console.log(this.data.userData[index].tests[i]);
      let filetosave=this.data.loadData(this.data.userData[index].tests[i]);
      console.log("Hi post filetosave "+ filetosave);
      //this.file.writeFile(this.file.documentsDirectory,this.data.userData[index].tests[i]+".csv",filetosave);
      console.log("Hi post csv "+ this.data.userData[index].tests[i]+".csv");
      filesPaths.push(this.file.documentsDirectory+this.data.userData[index].tests[i]+".csv");
    }
      console.log("Hi post path "+ filesPaths);
      let text="Tables "+this.data.userData[index].name+" "+this.data.userData[index].lastname;
      let email = {
        to: null,
        cc: null,
        bcc: null,
        attachments: filesPaths,
        subject: text,
        body: text,
        isHtml: true
      };
      console.log("Hi email "+ email);
      // Send a text message using default options
      this.emailComposer.open(email);
      console.log("Hi open? ");

  }
}
