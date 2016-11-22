import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { AccountService } from '../account.service';
import { UserTableFilterPipe } from './usertable-filter.pipe';

@Component({
  selector: 'lib-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  private users: User[] = [];

  //information used by datatable
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
  }

  onDeleteClicked(email: string) {
    if(email === localStorage.getItem('userName')) {
      alert("Don't delete your own account!!!");
    } else {
      alert("Deleting " + email);
    }
  }

  onRevokeClicked(email: string) {
    if(email === localStorage.getItem('userName')) {
      alert("Don't revoke your own privileges!!!");
    } else {
      alert("Revoking admin privileges from " + email);
    }
  }

  onMakeAdminClicked(email: string) {
    alert("Making " + email + " an admin");
  }

}
