import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AccountService } from '../account.service';
import { RequiredIconComponent } from '../../shared/required-icon/required-icon.component';
import { AccountValidators } from '../account.validators';

@Component({
  selector: 'lib-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  //references to modals to display in case of success or failure of form submission
  @ViewChild('successModal') successModal: ModalComponent;
  @ViewChild('failModal') failModal: ModalComponent;

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
                                    Validators.required, 
                                    Validators.pattern("^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$")],
                                    this.shouldBeUnique.bind(this)),
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    AccountValidators.registerPasswordsShouldMatch);
  }

  //async validator to make sure the email entered is unique
  shouldBeUnique(formControl: FormControl) {
    return new Promise((resolve, reject) => {
      this.accountService.checkEmail(formControl.value).subscribe(
        response => {
          if(response.json() == true) {
            resolve({ shouldBeUnique: true });
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  onSubmit() {
    if(this.registerForm.valid) {
      this.accountService.register(this.registerForm.value).subscribe(
        response => {
            this.successModal.open();
          },
          error => {
            this.failModal.open();
          }
      );
    }
  }

  onSuccess() {
    this.successModal.close();
    this.router.navigate(['/login']);
  }
}
