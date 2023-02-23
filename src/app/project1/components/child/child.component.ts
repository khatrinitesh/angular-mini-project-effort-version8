import { Component, Input, OnInit,Output ,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  @Input() childMsg:string;
  @Input() details:string;
  @Input() isActive:boolean=true;
  @Output() boxIdEmitter = new EventEmitter<string>();
  @Output() boxNewClick = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter();

  handleClick(event:string):void{
    this.boxIdEmitter.emit(event);
  }

  btnClick(value:string){
    this.boxNewClick.emit(value);
  }


  constructor() { }

  // ngOnChanges() {
  //   console.log('Child ngOnChanges');
  // }

  ngOnInit() {
    console.log('Child ngOnInit');
  }

  // ngDoCheck() {
  //   console.log('Child ngDoCheck');
  // }

  // ngAfterContentInit() {
  //   console.log('Child ngAfterContentInit');
  // }

  // ngAfterContentChecked() {
  //   console.log('Child ngAfterContentChecked');
  // }

  // ngAfterViewInit() {
  //   console.log('Child ngAfterViewInit');
  // }

  // ngAfterViewChecked() {
  //   console.log('Child ngAfterViewChecked');
  // }

  // ngOnDestroy() {
  //   console.log('Child ngOnDestroy');
  // }

}
