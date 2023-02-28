import { Component, OnInit, Output ,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-item-output',
  templateUrl: './item-output.component.html',
  styleUrls: ['./item-output.component.scss']
})
export class ItemOutputComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();


  addNewItem(value:string){
    this.newItemEvent.emit(value);
  }
  constructor() { }

  ngOnInit() {
  }

}
