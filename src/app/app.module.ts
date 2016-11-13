import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';

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

import { routes } from './app.routes';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { RegisterComponent } from './account/register/register.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';

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
    EditBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DropdownModule,
    CollapseModule,
    routes
  ],
  providers: [AuthorService, BookService, AccountService, AccountGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
