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
      
        breadcrumbService.addFriendlyNameForRoute('/dashboard', 'Dashboard');
        breadcrumbService.addFriendlyNameForRoute('/dashboard/dashboard-v1', 'Dashboard V1');
        breadcrumbService.addFriendlyNameForRoute('/session', 'Session');
        breadcrumbService.addFriendlyNameForRoute('/session/login', 'Login');
        breadcrumbService.addFriendlyNameForRoute('/session/register', 'Register');
        breadcrumbService.addFriendlyNameForRoute('/session/forgot-password', 'Forgot');
        breadcrumbService.addFriendlyNameForRoute('/session/lockscreen', 'Lock Screen');
    }

    ngOnInit() {
        this.innerWidth = window.innerWidth;
        console.log(this.innerWidth);
        this.pageTitleService.title.subscribe((val: string) => {
            this.header = val;
        });
        
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            this.url = event.url;
        });
        
        if (this.url != '/session/login' && this.url != '/session/register' && this.url != '/session/forgot-password' && this.url != '/session/lockscreen') {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar-container ');
            /** Perfect scrollbar for sidebar menu **/
            if (window.matchMedia(`(min-width: 960px)`).matches) {
                const ps = new PerfectScrollbar(elemSidebar, {
                                                  wheelSpeed: 2,
                                                  wheelPropagation: true,
                                                  minScrollbarLength: 20
                                                });
                ps.update();
            }

            /** Perfect scrollbar for chat window **/
            const elemChatbar = <HTMLElement>document.querySelector('.chat-inner ');
            if (window.matchMedia(`(min-width: 960px)`).matches) {
                const pse = new PerfectScrollbar(elemChatbar);
            }
        }
        
        if (this.media.isActive('xs') || this.media.isActive('sm')){
            this._mode = 'over';
            this._closeOnClickOutside = true;
            this._showBackdrop = true;
            this._opened = false;
            this.sidebarClosed = false;
        
        }
        
        this._mediaSubscription = this.media.asObservable().subscribe((change: MediaChange) => {
            let isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');

            this.isMobile = isMobile;
            this._mode = (isMobile) ? 'over' : 'push';
            this._closeOnClickOutside = (isMobile) ? true : false;
            this._showBackdrop = (isMobile) ? true : false;
            this._opened = !isMobile;
            this.sidebarClosed = false;
        });

        this._routerEventsSubscription = this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd && this.isMobile) {
            this.sidenav.close();
          }
        });
        
        // Add slideDown animation to dropdown
        $('.dropdown').on('show.bs.dropdown', function(e){
          $(this).find('.dropdown-menu').first().stop(true, true).slideDown(500);
        });

        // Add slideUp animation to dropdown
        $('.dropdown').on('hide.bs.dropdown', function(e){
          $(this).find('.dropdown-menu').first().stop(true, true).slideUp(500);
        });

        //Add class on focus of search box in header
        $('.search-form input').focus(function () {
            $(this).parent().addClass('search-active');
        }).blur(function () {
            $(this).parent().removeClass('search-active');
        });
    }
    

    ngOnDestroy() {
        this._router.unsubscribe();
        this._mediaSubscription.unsubscribe();
    }

	isFullscreen: boolean = false;
    
    menuMouseOver(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
            this._mode = 'over';
        }
    }

    menuMouseOut(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
            this._mode = 'push';
        }
    }

	toggleFullscreen() {
    	if (screenfull.enabled) {
    		screenfull.toggle();
      		this.isFullscreen = !this.isFullscreen;
    	}
  	}
    
    customizerFunction() {
        this.customizerIn = !this.customizerIn;
    }
     chatWindowFunction() {
        this.chatWindowOpen = !this.chatWindowOpen;
    }
    
    chatSidebarFunction(){
        this.chatSidebar = !this.chatSidebar;
    }
     sidebarClosedFunction(){
        this.sidebarClosed = !this.sidebarClosed;
    }

    changeThemeColor(color){
        this.themeSkinColor = color; 
    }

    addMenuItem(): void {
        this.menuItems.add({
            state: 'session',
            name: 'CHANKYA MENU',
            type: 'sub',
            icon: 'icon-plus icons',
            children: [
                {state: 'not-found', name: 'SUB MENU1'},
                {state: 'undermaintance', name: 'SUB MENU2'}
            ]
        });
    }
    onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

}

