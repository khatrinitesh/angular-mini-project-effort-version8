import { Component, OnInit,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-sibling2',
  templateUrl: './sibling2.component.html',
  styleUrls: ['./sibling2.component.scss']
})
export class Sibling2Component implements OnInit {

  ngOnInit() {
    this.data = [];
  }


  @Input() data;
  @Output() emitter:EventEmitter<any> = new EventEmitter();
  constructor() { }

 

  send(){
    let height = document.querySelector('div').offsetHeight;
    this.emitter.emit(height);
  }

}
