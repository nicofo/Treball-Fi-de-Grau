import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
  	birthday: Array<number>,
  	test: Array<void>
  	}>= [];
  public actualUserIndex: number = -1;
  constructor(){

  }

}
