import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpservicetwoService {

  private url = 'http://jsonplaceholder.typicode.com/users'

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get(this.url)
  }
}
