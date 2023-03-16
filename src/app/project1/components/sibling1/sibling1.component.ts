import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-sibling1',
  templateUrl: './sibling1.component.html',
  styleUrls: ['./sibling1.component.scss']
})
export class Sibling1Component implements OnInit {

  @Input() height;
  @Output() emitter:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.height = 0;
  }

}
