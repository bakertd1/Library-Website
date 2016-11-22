import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AccountService } from '../account.service';
import { RequiredIconComponent } from '../../shared/required-icon/required-icon.component';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  @ViewChild('modal') modal: ModalComponent;
  
  constructor(private router: Router, private accountService: AccountService) { }

  onSubmit(form: FormGroup) {
    if(form.valid) {
      this.accountService.login(form.value).subscribe(
        response => {

          //determine if user is an admin or not
          if(response.json().role === 'admin') {
            localStorage.setItem('is_admin', "true");
          } else {
            localStorage.setItem('is_admin', "false");
          }

          localStorage.setItem('access_token', response.json().access_token);
          localStorage.setItem('expires_in', response.json().expires_in);
          localStorage.setItem('token_type', response.json().token_type);
          localStorage.setItem('userName', response.json().userName);

          this.accountService.isLoggedIn.emit(true);
          this.router.navigate(['/']);
        },
        error => {
          this.modal.open();
        }
      );
    }
  }
}
