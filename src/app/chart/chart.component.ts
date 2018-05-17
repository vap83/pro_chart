import { Component } from '@angular/core';
import {GeniusService} from "../genius.service";

@Component({
  selector: 'pro-chart',
  templateUrl:'./chart-component.html',
  styleUrls: ['./chart-component.css']
})
export class ChartComponent {
  constructor(public geniusServic:GeniusService){

  }
}



