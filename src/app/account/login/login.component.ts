import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../account.service';
import { RequiredIconComponent } from '../../shared/required-icon/required-icon.component';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private router: Router, private accountService: AccountService) { }

  onSubmit(data) {
    this.accountService.login(data);

    if(localStorage.getItem('access_token')) {
      this.router.navigate(['/']);
    }
  }
}
