import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.scss']
})
export class VoterComponent implements OnInit {

  @Input() name = ''
  @Output() voted = new EventEmitter<boolean>();

  public didVote:boolean = false;

  public vote(agreed:boolean){
    this.voted.emit(agreed);
    this.didVote = true;
  }

  constructor() { }

  ngOnInit() {
  }

}
