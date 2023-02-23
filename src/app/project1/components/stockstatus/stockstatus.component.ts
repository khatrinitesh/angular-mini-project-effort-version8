import {  Component, Input, EventEmitter, Output, OnChanges , OnInit } from '@angular/core';

@Component({
  selector: 'app-stockstatus',
  templateUrl: './stockstatus.component.html',
  styleUrls: ['./stockstatus.component.scss']
})
export class StockstatusComponent implements OnInit {
    @Input() stock: number;
    @Input() productId: number;
    @Output() stockValueChange = new EventEmitter();
    color = '';
    updatedstockvalue: number;
    stockValueChanged() {
      this.stockValueChange.emit({ id: this.productId, updatdstockvalue: this.updatedstockvalue });
      this.updatedstockvalue = null;
  }
  
  ngOnChanges(){
    if(this.stock > 10){
      this.color = 'green'
    }
    else{
      this.color = 'red'
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
