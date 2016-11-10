import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './books/book-list.component';
import { AuthorListComponent } from './authors/author-list.component';

import { AuthorService } from './authors/author.service';
import { BookService } from './books/book.service';

import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BookListComponent,
    AuthorListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DropdownModule,
    CollapseModule,
    routes
  ],
  providers: [AuthorService, BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
