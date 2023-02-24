import { Component, OnInit, Output ,Input,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  @Input() dropdownItems:string;
  @Input() childMessage:string;
  @Output() messageEvent = new EventEmitter<string>();
  @Output() public newPrice = new EventEmitter<string>();
  @Output() public childEvent = new EventEmitter<string>();
  public price:any;
  public title:string;

  public fireEvent($event){
    this.childEvent.emit('Welcome to Angular @output')
  }
  

  onChange(value){
    this.newPrice.emit(value);
  }

  sendMessage(){
    this.messageEvent.emit(this.childMessage);
  }

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
