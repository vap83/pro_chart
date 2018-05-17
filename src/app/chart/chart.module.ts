import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartComponent } from './chart.component';
import { ChartRoutes } from './chart.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ChartRoutes)
  ],
  declarations: [
    ChartComponent
  ]
})

export class ChartModule {}
