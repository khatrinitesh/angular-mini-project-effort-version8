import { Component, OnInit,EventEmitter,
  Input,
  Output,
  ViewEncapsulation, } from '@angular/core';
  import { IOption } from "../../interface/models";
  

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {
  

  constructor() { }

  ngOnInit() {
  }

}
