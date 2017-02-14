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

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      email: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if(this.changePasswordForm.valid) {
      this.accountService.changePassword(this.changePasswordForm.value.email).subscribe(
        response => this.successModal.open(),
        error => { 
          console.log("something went wrong... " + error);
        }
      );
    }
  }

  onSuccess() {
    this.successModal.close();
    this.router.navigate(['/']);
  }

}
