import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {ChartComponent} from "./chart/chart.component";
import {GeniusService} from "./genius.service";


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GeniusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
