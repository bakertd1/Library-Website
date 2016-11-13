import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account.service';
import { RequiredIconComponent } from '../../shared/required-icon/required-icon.component';

@Component({
  selector: 'lib-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  onSubmit(registration) {
    this.accountService.register(registration);
  }
}
