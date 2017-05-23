import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstimulPage } from './estimul';

@NgModule({
  declarations: [
    EstimulPage,
  ],
  imports: [
    IonicPageModule.forChild(EstimulPage),
  ],
  exports: [
    EstimulPage
  ]
})
export class EstimulPageModule {}
