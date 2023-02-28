import { Component, OnInit,OnDestroy  } from '@angular/core';

@Component({
  selector: 'app-countdowntimer',
  templateUrl: './countdowntimer.component.html',
  styleUrls: ['./countdowntimer.component.scss']
})
export class CountdowntimerComponent implements OnInit {

  public intervalId:number = 0;
  public message:string = '';
  public seconds:number = 11;

  ngOnDestroy(){
    this.clearTimer();
  }

  // START
  start() { 
    this.countDown(); 
  }
  // STOP
  stop()  {
    this.clearTimer();
    this.message = `Holding at T-${this.seconds} seconds`;
  }
  // CLEARTIMER
  private clearTimer() { 
    clearInterval(this.intervalId); 
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'Blast off!';
      } else {
        if (this.seconds < 0) { this.seconds = 10; } // reset
        this.message = `T-${this.seconds} seconds and counting`;
      }
    }, 1000);
  }

  constructor() { }

  ngOnInit() {
  }

}
