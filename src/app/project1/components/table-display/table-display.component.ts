import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'table-display',
  templateUrl: './table-display.component.html',
  styleUrls: ['./table-display.component.scss']
})
export class TableDisplayComponent implements OnInit {
  public headers: any;

  @Input() items:any[];

  constructor() { }

  ngOnInit() {
    this.headers = Object.keys(this.items[0])
  }

}
