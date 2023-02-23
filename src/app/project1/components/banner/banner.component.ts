import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  public bannerTitle:string="Banner";
  public bannerDesc:string="Lorem Ipsum Lorem Ipsum";

  constructor() { }

  ngOnInit() {
  }

}
