import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  constructor() { }

  ngOnChanges() {
    console.log('Child ngOnChanges');
  }

  ngOnInit() {
    console.log('Child ngOnInit');
  }

  ngDoCheck() {
    console.log('Child ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('Child ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('Child ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('Child ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('Child ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('Child ngOnDestroy');
  }

}
