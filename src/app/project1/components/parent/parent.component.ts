import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  constructor() { }

  ngOnChanges() {
    console.log('Parent ngOnChanges');
  }

  ngOnInit() {
    console.log('Parent ngOnInit');
  }

  ngDoCheck() {
    console.log('Parent ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('Parent ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('Parent ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('Parent ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('Parent ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('Parent ngOnDestroy');
  }

}
