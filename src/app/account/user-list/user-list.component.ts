import { Component, OnInit, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { User } from '../user';
import { AccountService } from '../account.service';
import { UserTableFilterPipe } from './usertable-filter.pipe';

@Component({
  selector: 'lib-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  private users: User[] = [];

  //user email to delete
  private email = "";

  //error message to display in errorModal
  private errorMessage = "";

  //information used by datatable
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "email";
  public sortOrder = "asc";

  //get reference to modal to confirm user delete
  @ViewChild('deleteModal') deleteModal: ModalComponent;

  //get reference to modal to display error messages
  @ViewChild('errorModal') errorModal: ModalComponent;

  //get reference to modal to confirm revoke admin privileges
  @ViewChild('revokeModal') revokeModal: ModalComponent;

  //get reference to modal to confirm make user admin
  @ViewChild('makeAdminModal') makeAdminModal: ModalComponent;

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
      this.errorMessage = "You can't delete your own account!";
      this.errorModal.open();
    } else if(email === "admin@test.com") {
      this.errorMessage = "You cannot delete the main admin account!";
      this.errorModal.open();
    } else {
      this.email = email;
      this.deleteModal.open();
    }
  }

  onDeleteConfirmed() {
    this.deleteModal.close();
    this.accountService.deleteUser(this.email).subscribe(
      response => {
        this.users = this.users.filter(u => u.email !== this.email);
      }
    );
  }

  onRevokeClicked(email: string) {
    if(email === localStorage.getItem('userName')) {
      this.errorMessage = "You can't revoke your own privileges!";
      this.errorModal.open();
    } else if(email === "admin@test.com") {
      this.errorMessage = "You can't revoke the privileges of this user!";
      this.errorModal.open();
    } else {
      this.email = email;
      this.revokeModal.open();
    }
  }

  onRevokeConfirmed() {
    this.revokeModal.close();
    this.accountService.revokeAdmin(this.email).subscribe(
      (response: Response) => {
        this.accountService.getUsers().subscribe(
          (users: User[]) => {
            this.users = users;
          }
        );
      }
    );
  }

  onMakeAdminClicked(email: string) {
    this.email = email;
    this.makeAdminModal.open();
  }

  onMakeAdminConfirmed() {
    this.makeAdminModal.close();
    this.accountService.makeAdmin(this.email).subscribe(
      (response: Response) => {
        this.accountService.getUsers().subscribe(
          (users: User[]) => {
            this.users = users;
          }
        );
      }
    );
  }

}
