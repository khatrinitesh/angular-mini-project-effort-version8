import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  @Input() name: string = "Default Value";
  @Input() age: number = 14;
  @Input() account: Account;

  constructor() { }

  ngOnInit() {
  }

}
