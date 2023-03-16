import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public data :any[]= [
    {name:"Liam", age:"20", post: "Marketing Coordinator"},
    {name:"Noah", age:"25" , post:"Medical Assistant"},
    {name:"Oliver", age:"22", post:"Web Designer"},
    {name:"William", age:"20", post:"Dog Trainer"},
    {name:"Bill", age: "22", post:"President of Sales"},
    {name:"James", age: "19", post:"Project Manager"},
  ];
  items = [];

  @Input() keyword:string;

  constructor() { }

  ngOnInit():void {
    this.refresh();
  }

  ngDoCheck(){
    this.refresh();
  }
  
  refresh(){
    this.items = [];
    this.data.forEach(
      item => {
        if(item.name.search(this.keyword) != -1
         || item.age.search(this.keyword) != -1 
         || item.post.search(this.keyword) != -1) {
          this.items.push(item)
        }
      }
    ) 
  }

}
