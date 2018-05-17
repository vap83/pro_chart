import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { SidebarModule } from 'ng-sidebar';
import {Ng5BreadcrumbModule, BreadcrumbService} from 'ng5-breadcrumb';
import 'hammerjs';

import { ChankyaAppComponent} from './app.component';
import { AppRoutes } from "./app-routing.module";
import { MainComponent }   from './main/main.component';
import { AuthComponent }   from './auth/auth.component';
import { MenuToggleModule } from './core/menu/menu-toggle.module';
import { MenuItems } from './core/menu/menu-items/menu-items';
import { PageTitleService } from './core/page-title/page-title.service';
import {ChartComponent} from './chart/chart.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

const perfectScrollbarConfig: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		SidebarModule.forRoot(),
		RouterModule.forRoot(AppRoutes),
		FlexLayoutModule,
		Ng5BreadcrumbModule.forRoot(),
		AgmCoreModule.forRoot({apiKey: 'AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk'}),
        PerfectScrollbarModule,
        MenuToggleModule,
        HttpModule,
        TranslateModule.forRoot({
		    provide: TranslateLoader,
		    useFactory: (createTranslateLoader),
		    deps: [Http]
		}),
	],
	declarations: [
		ChankyaAppComponent,
		MainComponent,
		AuthComponent,
    ChartComponent
	],
	entryComponents: [
	],
	bootstrap: [ChankyaAppComponent],
	providers:[
		MenuItems,
		BreadcrumbService,
		PageTitleService
	]
})
export class ChankyaAppModule { }
