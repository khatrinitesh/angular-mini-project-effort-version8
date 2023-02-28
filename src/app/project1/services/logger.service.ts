import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  writeCount(count:number){
    console.warn(count);
  }

  constructor() { }
}
