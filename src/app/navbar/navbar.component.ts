import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { AccountService } from '../account/account.service';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    .lib-btn {
      cursor: pointer;
    }
  `]
})
export class NavbarComponent implements OnInit, OnDestroy {
  isCollapsed: boolean = true;  //used to determine if collapsable menus are collapsed by default
  isLoggedIn: boolean = false;  //used to control navigation options based on whether the user is logged in or not
  isAdmin: boolean = false; //used to control navigation options based on whether the user is an admin or not
  username: string = localStorage.getItem('userName');  //used to display the user's username if logged in

  private subscription: Subscription;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.subscription = this.accountService.isLoggedIn.subscribe(
      (data: boolean) => {
        this.isLoggedIn = data;

        this.username = localStorage.getItem('userName');
        
        if(localStorage.getItem('is_admin') === 'true') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      }
    );
  }

  onLogout() {
    this.isAdmin = false;
    this.isLoggedIn = false;
    this.isCollapsed = true;
    this.accountService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
