import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {ServiceService} from '../../services/service.service';
import { Person,CTeam ,Idata} from '../../components/idata';
import { Observable } from 'rxjs';
import { ThrowStmt, isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public showelement:boolean=false ;
  @Input() countdata: number = 0;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  public interval: any;
  public count = 0;
  public CustomerData: any = this.GetCustomerData();
  public ItemsData: any = this.GetItemData();
  public WeatherData: any = this.GetWeatherData();
  public apiData:Array<Idata>=[];
  // public response:Observable<Idata[]>;
  // public showasync:boolean;
  // public show:boolean;

  public increment(){
    this.countdata++
    this.change.emit(this.count);
    this.showelement = false
  }

  public decrement(){
    this.countdata--;
    this.change.emit(this.count);
  }

  btnRemove(index){
    this.apiData.splice(index, 1);
    // this.apiData = this.apiData.filter(item => item !== index)
  }

  public GetCustomerData() {
    return [
      {
        name: "John Smith",
        address: "New York City",
        email: "john@nowhere.com",
        phone: "123456789"
      },
      {
        name: "Mark John",
        address: "Los Angeles",
        email: "mark@everywhere.com",
        phone: "789456123"
      },
      {
        name: "Amanda Nester",
        address: "Miami",
        email: "amanda@here.com",
        phone: "85213456"
      }
    ];
  }
  public GetItemData() {
    return [
      {
        name: "Laptops",
        Model: "Surface",
        Price: "$1500"
      },
      {
        name: "Keyboard",
        Model: "Logitec",
        Price: "$50"
      },
      {
        name: "Phone",
        Model: "Galexy S10",
        Price: "$800"
      }
    ];
  }
  public GetWeatherData() {
    return [
      {
        City: "Philadelphia",
        Weather: "Cold",
        "Chance Of Rain": "10%"
      },
      {
        City: "Dallas",
        Weather: "Warm",
        "Chance Of Rain": "50%"
      },
      {
        City: "san Francisco",
        Weather: "Chilli",
        "Chance Of Rain": "0%"
      }
    ];
  }

  constructor(private _apiserv:ServiceService) {
    // console.log('constructor: logging starting...');
    // this.interval= setInterval(() => {
    //   console.log(this.count++)
    // },500)
    // this.onAsync();
   this.onSubscribe();
   }


   onSubscribe(){
    this._apiserv.getdata().subscribe(data => {
      this.apiData = data;
    })
   }
  
  // onAsync(){
  //   this.show=false;
  //   this.showasync=true;
  //   this.response= this._apiserv.getdata();
  // }


  //  ngOnDestroy() {
  //   console.log('ngOnDestroy: cleaning up...');
  //   clearInterval(this.interval);
  // }


  public team: CTeam[]=[
    {
      name:'sachin tendulkar',
      age:26
    },
    {
      name:'sourav ganguly',
      age:27
    },
    {
      name:'rahul dravid',
      age:27
    },
  ]
  public PersonData :Person[] = [
    {
      name:'nitesh',
      email:'nitesh@gmail.com',
      hide:true,
    },
    {
      name:'sameet',
      email:'sameet@gmail.com',
      hide:true,
    },
    {
      name:'michael',
      email:'michael@gmail.com',
      hide:false,
    },
  ]


  ngOnInit() {
    
  }

}

