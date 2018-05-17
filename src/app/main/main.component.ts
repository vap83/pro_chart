import { Component, OnInit, OnDestroy, ViewChild, HostListener, ViewEncapsulation, AnimationTransitionEvent }      from '@angular/core';
import { MenuItems } from '../core/menu/menu-items/menu-items';
import { BreadcrumbService} from 'ng5-breadcrumb';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import PerfectScrollbar from 'perfect-scrollbar';
declare var $ : any;

const screenfull = require('screenfull');

@Component({
    selector: 'chankya-layout',
  	templateUrl:'./main-material.html',
  	styleUrls: ['./main-material.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy{

    private _router: Subscription;
    header: string;
    currentLang = 'en';
    url: string;
    showSettings = false;
    themeSkinColor: any = "light";
    dark: boolean;
    boxed: boolean;
    collapseSidebar: boolean;
    compactSidebar: boolean;
    customizerIn: boolean = false;
    chatWindowOpen: boolean = false;
    chatSidebar: boolean = false;
    sidebarClosed: boolean = false;
    root = 'ltr';
    chatpanelOpen: boolean = false;

    private _mediaSubscription: Subscription;
    sidenavOpen: boolean = true;
    sidenavMode: string = 'side';
    isMobile: boolean = false;
    private _routerEventsSubscription: Subscription;
    public innerWidth: any;


    @ViewChild('sidenav') sidenav;

    _opened: boolean = true;
    _mode: string = "push";
    _closeOnClickOutside: boolean = false;
    _showBackdrop: boolean = false;

    public _toggleOpened(): void {
        this._opened = !this._opened;
     }

	constructor(public menuItems: MenuItems, private breadcrumbService: BreadcrumbService, private pageTitleService: PageTitleService, public translate: TranslateService, private router: Router, private media: ObservableMedia) {
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    }

    ngOnInit() {

    }


    ngOnDestroy() {
        this._router.unsubscribe();
        this._mediaSubscription.unsubscribe();
    }



}


