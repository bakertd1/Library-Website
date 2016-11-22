import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import 'lodash';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './books/book-list.component';
import { AuthorListComponent } from './authors/author-list.component';
import { AddAuthorComponent } from './authors/add-author/add-author.component';
import { RequiredIconComponent } from './shared/required-icon/required-icon.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { LoginComponent } from './account/login/login.component';

import { AuthorService } from './authors/author.service';
import { BookService } from './books/book.service';
import { AccountService } from './account/account.service';
import { AccountGuard } from './account/account.guard';
import { AdminGuard } from './account/admin.guard';
import { AccountValidators } from './account/account.validators';

import { routes } from './app.routes';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { RegisterComponent } from './account/register/register.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { EditAuthorComponent } from './authors/edit-author/edit-author.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';

import { AuthorTableFilterPipe } from './authors/authortable-filter.pipe';
import { BookTableFilterPipe } from './books/booktable-filter.pipe';
import { UserTableFilterPipe } from './account/user-list/usertable-filter.pipe';
import { UserListComponent } from './account/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BookListComponent,
    AuthorListComponent,
    AddAuthorComponent,
    RequiredIconComponent,
    AddBookComponent,
    LoginComponent,
    AuthorDetailsComponent,
    BookDetailsComponent,
    RegisterComponent,
    EditBookComponent,
    EditAuthorComponent,
    ChangePasswordComponent,
    AuthorTableFilterPipe,
    BookTableFilterPipe,
    UserListComponent,
    UserTableFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DropdownModule,
    CollapseModule,
    DataTableModule,
    Ng2Bs3ModalModule,
    routes
  ],
  providers: [AuthorService, BookService, AccountService, AccountGuard, AdminGuard, AccountValidators],
  bootstrap: [AppComponent]
})
export class AppModule { }
