import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { EmailComposer } from '@ionic-native/email-composer';
import { IonicStorageModule } from '@ionic/storage';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CreateUserPage } from '../pages/create-user/create-user';
import { EstimulPage } from '../pages/estimul/estimul';
import { TestPage } from '../pages/test/test';
import { EndTestPage } from '../pages/end-test/end-test';
import { ConfigPage } from '../pages/config/config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CreateUserPage,
    EstimulPage,
    TestPage,
    EndTestPage,
    ConfigPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CreateUserPage,
    EstimulPage,
    TestPage,
    EndTestPage,
    ConfigPage
  ],
  providers: [
    StatusBar,
    File,
    EmailComposer,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
