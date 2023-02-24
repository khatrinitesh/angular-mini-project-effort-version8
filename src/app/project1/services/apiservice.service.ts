import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExampleApi } from '../components/idata';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  public url = 'https://jsonplaceholder.typicode.com/posts'
  constructor(private apiserv:HttpClient) {   }


  public getData():Observable<ExampleApi[]>{
    return this.apiserv.get<ExampleApi[]>(this.url)
  }

  
  
}
