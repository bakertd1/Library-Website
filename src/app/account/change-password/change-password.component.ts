import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from '../account.service';

@Component({
  selector: 'lib-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if(this.changePasswordForm.valid) {
      this.accountService.changePassword(this.changePasswordForm.value);
      this.router.navigate(['/']);
    }
  }

}
