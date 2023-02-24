import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'https://reqres.in';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private httpc:HttpClient) { }

  public get(url):Observable<any>{
    return this.httpc.get(API_URL + '/api/' + url).pipe(map(res => res));
  }
}
