// IData
export interface Idata {
    userId:number;
    Id:number;
    title:string;
    body:string;
}
// Person
export interface Person{
    name:string;
    email:string;
    hide:boolean;  
}

// CRICKET TEAM
export interface CTeam{
    name:string;
    age:number,
}

// https://www.geodev.me/blog/parent-child-communication-using-angular/
export interface IBox{
    id:number;
    name:string;
    desc:string;
    title:string;
    body:string;
}