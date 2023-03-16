import { Component, OnInit,Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() emitter:EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit():void {
  }

  emit(keyword){
    this.emitter.emit(keyword)
  }

}
