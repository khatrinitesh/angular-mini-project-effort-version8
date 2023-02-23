import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project 1 
// pages
import { HomeComponent } from './project1/pages/home/home.component';
import { AboutComponent } from './project1/pages/about/about.component';
import { ServiceComponent } from './project1/pages/service/service.component';
import { ContactComponent } from './project1/pages/contact/contact.component';
import { ErrorComponent } from './project1/pages/error/error.component';


// const routes: Routes = [];

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: ErrorComponent },  // Wildcard route for a 404 page
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
