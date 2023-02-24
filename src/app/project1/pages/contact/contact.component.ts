import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public message:string = '';
  public parentMsg:string = 'nitesh'
  public distanceDropdownItems:any[]
  public price:any;
  public massege = "";
  public newArr = [];
  public arr = [];
  public exampleText:string = 'strikethrough'
  public imageURL:string = 'https://c.staticblitz.com/assets/media/client/homepage/images/logo-b1a300e55fb8d38e1cccab1b7754a10b.png'
  public counter = 2;
  public inputValue = 'Example Text';
  public rowsNum = '10'
  public colsNum = '10'
  public color = 'red'
  public isDisabled:boolean=false;
  public buttonStatus = 'disabled';
  className = 'myClass';

  public obj = {
    id:1,
    name:'alll'
  }
  
  constructor() { }

  ngOnInit() {
    this.distanceDropdownItems = ['hello', 'you', 'there'];
    console.log(this.distanceDropdownItems);
  }

  receivemsg(value:string):void{
    this.message = value;
    alert(this.message)
  }

  onChange(value){
    this.price = value;
  }

  pushArrIntoObj(){
    debugger;
    this.arr.push(this.obj)
    this.newArr.push(this.obj)
    this.obj.name = 'hamza';
    console.log(this.arr,this.newArr)
  }
  pushNewArrIntoObj(){
    debugger;
    this.arr.push(this.obj)
    this.newArr.push(this.obj)
    this.obj.name = 'sameet'
    console.log(this.arr,this.newArr)
  }
}
