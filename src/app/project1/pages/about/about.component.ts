import { Component, EventEmitter, Input, OnInit, Output ,OnChanges, SimpleChanges,ViewChild } from '@angular/core';
import {ServiceService} from '../../services/service.service';
import { DemoService } from '../../services/demo.service';
import { Person,CTeam ,Idata, Kafein,ExampleApi} from '../../components/idata';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { ApiserviceService } from '../../services/apiservice.service';
import { LoggerService } from '../../services/logger.service';
import { CountdowntimerComponent } from '../../components/countdowntimer/countdowntimer.component';
import { DateformatPipe } from '../../pipe/dateformat.pipe';
import { HttpserviceService } from '../../services/httpservice.service';
import { HttpservicetwoService } from '../../services/httpservicetwo.service';
import { IOption } from '../../interface/models';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  API: string = 'https://jsonplaceholder.typicode.com/posts';
  data: any;
  newdata:any;
  public hero:string=''
  public amount:number = 122
  public count:number = 0;
  public showelement:boolean=false ;
  public interval: any;
  public CustomerData: any = this.GetCustomerData();
  public ItemsData: any = this.GetItemData();
  public WeatherData: any = this.GetWeatherData();
  public apiData:Array<Idata>=[];
  public posts:any;
  public apiDataTwo:Array<ExampleApi>=[];
  public users: any;
  public httpData:any;
  public fontColor = 'blue';
  public sayHelloId = 1;
  public headtitle :string='About works'
  public canClick:boolean=false;
  public url = 'https://jsonplaceholder.typicode.com/todos'
  public canEdit:boolean=true;
  public message:string='';
  public ds:any;


  public changeHandler({ optionType, optionValue }: IOption): void {
    this[optionType] = optionValue;
  }
  
  @Input() major = 0;
  @Input() minor = 0;
  changeLog:string[]=[];
  // public response:Observable<Idata[]>;
  // public showasync:boolean;
  // public show:boolean;
  @Input() countdata: number = 0;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  public agreed:number = 0;
  public disagreed:number = 0;
  public voters = ['Dr. IQ', 'Celeritas', 'Bombasto'];
  public items = ['item1', 'item2', 'item3', 'item4'];
  public currentCustomer:string = 'Maria';
  public itemImageUrl:string  = 'https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg'
  public customer:string='Bala'
  public isUnchanged:boolean = false;
  public  birthday = new Date(2011, 3, 10); 
  public herotwo:boolean=false;
  color = '';

  navStyle = 'font-size:1.2rem;color:cornflowerblue';
  linkStyle = 'underline'
  activeLinkStyle = 'overline';

  public  customers = [
    {value: 'Ebony'}, 
    {value: 'Chiho'}
  ]

   addItem(newItem:string):void{
    this.items.push(newItem)
  }

  public onVoted(agreed:boolean){
    if(agreed){
      this.agreed++
    }
    else{
      this.disagreed++
    }
  }

  
  private timerComponent!: CountdowntimerComponent;

  seconds() { return 0; }

  ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
  }

  start() { this.timerComponent.start(); }
  stop() { this.timerComponent.stop(); }

  ngOnChanges(changes: SimpleChanges) {
    const log: string[] = [];
    for (const propName in changes) {
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));
  }


  public onEditClick(){
    this.canEdit = !this.canEdit;
    if(this.canEdit){
      this.message = "you can edit me";
    }
    else{
      this.message = "i'm read only";
    }
  }

  public sayMessage(){
    alert('hi ')
  }

  public btninc(){
    this.count++
  }
  public btndec(){
    this.count--
  }
  public btnreset(){
    this.count = 0;
  }

  public increment(){
    this.countdata++
    this.change.emit(this.count);
    this.showelement = false
  }

  public decrement(){
    this.countdata--;
    this.change.emit(this.count);
  }


  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }

  btnRemove(index){
    this.apiData.splice(index, 1);
    // this.apiData = this.apiData.filter(item => item !== index)
  }
  btnRemoveNew(index){
    this.newdata.splice(index, 1);
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

  public results: any;
  height;

  constructor(private _apiserv:ServiceService,private demoserv:DemoService,private httpc:HttpClient,private _apiservtwo:ApiserviceService,private loggerserv:LoggerService,private httpcc:HttpserviceService,private httpc2:HttpservicetwoService) {
    // console.log('constructor: logging starting...');
    // this.interval= setInterval(() => {
    //   console.log(this.count++)
    // },500)
    // this.onAsync();
   this.onSubscribe();
   this.onSubscribeTwo();
   this.onSubscribeThree();
   this.onSubscribeFour();
   }


   onLogMe(){
    this.loggerserv.writeCount(this.count);
    this.count++
   }

   onSubscribeFour(){
    this.httpc2.getData().subscribe(data  => {
      this.ds = data;
    })
   }



   onSubscribeThree(){
    this.httpcc.getPosts().subscribe(data => {
      this.posts = data;
    })
   }

   onSubscribeTwo(){
    this._apiservtwo.getData().subscribe(data => {
      this.apiDataTwo = data;
    })
   }
   onSubscribe(){
    this._apiserv.getdata().subscribe(data => {
      this.apiData = data;
    })
    
   }

   btnRemovee(i:number):void{
    this.ds.splice(i,1);
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

  keyword = "";
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

  send(keyword){
    this.keyword = keyword;
  }


  ngOnInit() {
    this.httpc.get(this.API).subscribe((res) => {
      this.newdata = res;
      console.log(res);
    },err => {
      alert(err)
    })
    this.demoserv.get('users?page=1').subscribe(res => {
      this.users = res;
      console.log('data response',this.users);
    })
    this.callApi();
    this.getApiResponse();
    this.height = 0;
    this.data = [];
  }

  getApiResponse(){
    this.httpc.get('https://jsonplaceholder.typicode.com/posts').subscribe((response) =>{
      this.results = response;
    })
  }

  mergeData(data){
    // Convert the string to array of strings
    this.data = data.split(",");
  }
  mergeHeight(height){
    this.height = height;
  }



  callApi(){
    this.httpc.get<Kafein[]>(this.url).subscribe(data => {
      this.httpData = data;
      console.log(data);
    })
  }

}

