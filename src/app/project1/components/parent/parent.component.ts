import { Component, OnInit } from '@angular/core';
import { IBox } from '../idata';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  public products = [];

  btnButton(event:string):void{
    this.activeElement = event;
    alert('hi')
  }

  public boxCollection:IBox[]=[
    {
      id: 1,
      name: 'Uruguay',
      desc:'Lorem ipsum',
      title:'title 1',
      body:'Lorem ipsum'
    },
    {
      id: 2,
      name: 'Mongolia',
      desc:'Lorem ipsum',
      title:'title 1',
      body:'Lorem ipsum'
    },
    {
      id: 3,
      name: 'Japan',
      desc:'Lorem ipsum',
      title:'title 1',
      body:'Lorem ipsum'
    },
    {
      id: 4,
      name: 'Moldova',
      desc:'Lorem ipsum',
      title:'title 1',
      body:'Lorem ipsum'
    },
    {
      id: 5,
      name: 'Rwanda',
      desc:'Lorem ipsum',
      title:'title 1',
      body:'Lorem ipsum'
    }
  ]
  parentMsg:string='nitesh khatri'
  activeElement: string;

  handleActiveClick(value:string){
    this.activeElement = value;
  }

  constructor() { }

  ngOnInit(): void {
    this.products = this.getProducts();
  }

  productToUpdate: any;
  changeStockValue(p) {
      this.productToUpdate = this.products.find(this.findProducts, [p.id]);
      this.productToUpdate.stock = this.productToUpdate.stock + p.updatdstockvalue;
  }
  findProducts(p) {
      return p.id === this[0];
  }

  getProducts(){
    return [
      { 'id': '1', 'title': 'Screw Driver', 'price': 400, 'stock': 11 },
      { 'id': '2', 'title': 'Nut Volt', 'price': 200, 'stock': 5 },
      { 'id': '3', 'title': 'Resistor', 'price': 78, 'stock': 45 },
      { 'id': '4', 'title': 'Tractor', 'price': 20000, 'stock': 1 },
      { 'id': '5', 'title': 'Roller', 'price': 62, 'stock': 15 },
    ]
  }

  // ngOnChanges() {
  //   console.log('Parent ngOnChanges');
  // }

  // ngOnInit() {
  //   console.log('Parent ngOnInit');
  // }

  // ngDoCheck() {
  //   console.log('Parent ngDoCheck');
  // }

  // ngAfterContentInit() {
  //   console.log('Parent ngAfterContentInit');
  // }

  // ngAfterContentChecked() {
  //   console.log('Parent ngAfterContentChecked');
  // }

  // ngAfterViewInit() {
  //   console.log('Parent ngAfterViewInit');
  // }

  // ngAfterViewChecked() {
  //   console.log('Parent ngAfterViewChecked');
  // }

  // ngOnDestroy() {
  //   console.log('Parent ngOnDestroy');
  // }

}
