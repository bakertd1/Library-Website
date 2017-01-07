import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AccountService } from '../account.service';
import { AccountValidators } from '../account.validators';

@Component({
  selector: 'lib-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  //error message to display in failModal
  private errorMessage = "";
  
  changePasswordForm: FormGroup;

  @ViewChild('successModal') successModal: ModalComponent;
  @ViewChild('failModal') failModal: ModalComponent;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
      confirmPassword: new FormControl('', [Validators.required])
    }, AccountValidators.changePasswordsShouldMatch);
  }

  onSubmit() {
    if(this.changePasswordForm.valid) {
      this.accountService.changePassword(this.changePasswordForm.value).subscribe(
        response => this.successModal.open(),
        error => {

          if(error.message === "This user cannot make changes to the database!") {
            this.errorMessage = error.message;
          } else {
            this.errorMessage = "Old Password is incorrect!";
          }
          this.failModal.open();
        }
      );
    }
  }

  onSuccess() {
    this.successModal.close();
    this.router.navigate(['/']);
  }

}
