import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { MainComponent }   from './main/main.component';
import { AuthComponent }   from './auth/auth.component';

export const AppRoutes: Routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full',
},{
  path: '',
  component: MainComponent,
  children: [{
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },{
    path: 'pages',
    loadChildren: './blank/blank.module#BlankModule'
  },{
    path: 'chart',
    loadChildren: './chart/chart.module#ChartModule'
  }],
},{
  path: '',
  component: AuthComponent,
  children: [{
    path: 'session',
    loadChildren: './session/session.module#SessionDemoModule'
  }]
}];

