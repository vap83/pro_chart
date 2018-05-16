import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";

@Component({
   selector: 'ms-loginone-session',
   templateUrl:'./loginone-component.html',
   styleUrls: ['./loginone-component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class LoginoneComponent {
	
  email: string;
  password: string;

  constructor(
    private router: Router
  ) { }

  loginone() {
    this.router.navigate(['/']);
  }
	
}



