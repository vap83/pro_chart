import {Component, Optional, ViewEncapsulation} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  	selector: 'chankya-app',
  	template:'<router-outlet></router-outlet>',
    encapsulation: ViewEncapsulation.None
})
export class ChankyaAppComponent {
   constructor(translate: TranslateService) {
       translate.addLangs(['en', 'fr']);
       translate.setDefaultLang('en');

       const browserLang: string = translate.getBrowserLang();
       translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
     }
}
