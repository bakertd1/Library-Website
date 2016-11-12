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
  isCollapsed: boolean = true;
  isLoggedIn: boolean = false;;
  private subscription: Subscription;
  username: string = localStorage.getItem('userName');

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.subscription = this.accountService.isLoggedIn.subscribe(
      (data: boolean) => {
        this.isLoggedIn = data;
        this.username = localStorage.getItem('userName');
      }
    );
  }

  onLogout() {
    this.isLoggedIn = false;
    this.isCollapsed = true;
    this.accountService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
