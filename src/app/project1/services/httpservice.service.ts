import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  private url = 'https://my-json-server.typicode.com/JSGund/XHR-Fetch-Request-JavaScript/posts';
  constructor(private httpcr:HttpClient) { }

  getPosts(){
    return this.httpcr.get(this.url)
  }
}
