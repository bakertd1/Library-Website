import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BookListComponent } from './books/book-list.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { AuthorListComponent } from './authors/author-list.component';
import { AddAuthorComponent } from './authors/add-author/add-author.component';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'books', component: BookListComponent },
    { path: 'books/new', component: AddBookComponent },
    { path: 'books/details/:id', component: BookDetailsComponent },
    { path: 'authors', component: AuthorListComponent },
    { path: 'authors/new', component: AddAuthorComponent },
    { path: 'authors/details/:id', component: AuthorDetailsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
];

export const routes = RouterModule.forRoot(APP_ROUTES);