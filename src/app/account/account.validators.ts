import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { AccountService } from './account.service';

@Injectable()
export class AccountValidators {
    static registerPasswordsShouldMatch(group: FormGroup) {
        var password = group.get('password').value;
        var confirmPassword = group.get('confirmPassword').value;

        if(password == '' || confirmPassword == '')
            return null;

        if(password != confirmPassword) {
            return { passwordsShouldMatch: true };
        }

        return null;
    }

    static changePasswordsShouldMatch(group: FormGroup) {
        var newPassword = group.get('newPassword').value;
        var confirmPassword = group.get('confirmPassword').value;

        if(newPassword == '' || confirmPassword == '')
            return null;

        if(newPassword != confirmPassword) {
            return { passwordsShouldMatch: true };
        }

        return null;
    }
}