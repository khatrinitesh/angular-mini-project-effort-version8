import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';


// => PROJECT 1
// PAGES
import { HomeComponent } from './project1/pages/home/home.component';
import { AboutComponent } from './project1/pages/about/about.component';
import { ServiceComponent } from './project1/pages/service/service.component';
import { ContactComponent } from './project1/pages/contact/contact.component';
import { ErrorComponent } from './project1/pages/error/error.component';
// COMPONENTS
import { HeaderComponent } from './project1/components/header/header.component';
import { FooterComponent } from './project1/components/footer/footer.component';
import { BannerComponent } from './project1/components/banner/banner.component';
import { ChildComponent } from './project1/components/child/child.component';
import { ParentComponent } from './project1/components/parent/parent.component';
import { TableDisplayComponent } from './project1/components/table-display/table-display.component';
import { VoterComponent } from './project1/components/voter/voter.component';
import { CountdowntimerComponent } from './project1/components/countdowntimer/countdowntimer.component';
import { ItemOutputComponent } from './project1/components/item-output/item-output.component';
import { DateformatPipe } from './project1/pipe/dateformat.pipe';
import { ConfiguratorComponent } from './project1/components/configurator/configurator.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ServiceComponent,
    ContactComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ChildComponent,
    ParentComponent,
    TableDisplayComponent,
    VoterComponent,
    CountdowntimerComponent,
    ItemOutputComponent,
    DateformatPipe,
    ConfiguratorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
