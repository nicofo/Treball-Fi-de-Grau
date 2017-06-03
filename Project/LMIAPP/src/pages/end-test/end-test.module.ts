import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EndTestPage } from './end-test';

@NgModule({
  declarations: [
    EndTestPage,
  ],
  imports: [
    IonicPageModule.forChild(EndTestPage),
  ],
  exports: [
    EndTestPage
  ]
})
export class EndTestPageModule {}
