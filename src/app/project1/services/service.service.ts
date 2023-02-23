import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Idata } from '../components/idata';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpc:HttpClient) { }
    public getdata():Observable<Idata[]>{
      return this.httpc.get<Idata[]>('https://jsonplaceholder.typicode.com/posts');
    }
}
