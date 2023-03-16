import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
  }

  form:FormGroup = this.formBuilder.group({
      zip:'',
      street:'',
      city:''
   })

}
