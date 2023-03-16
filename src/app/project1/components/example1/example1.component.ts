import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit {

  public exmones:any[]=[
    {
      name:'nitesh'
    },
    {
      name:'sachin'
    },
    {
      name:'rahul'
    },
    {
      name:'sourav'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
