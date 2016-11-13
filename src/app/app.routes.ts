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
import { AccountGuard } from './account/account.guard';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'books', component: BookListComponent, canActivate: [AccountGuard] },
    { path: 'books/new', component: AddBookComponent, canActivate: [AccountGuard] },
    { path: 'books/details/:id', component: BookDetailsComponent, canActivate: [AccountGuard] },
    { path: 'authors', component: AuthorListComponent, canActivate: [AccountGuard] },
    { path: 'authors/new', component: AddAuthorComponent, canActivate: [AccountGuard] },
    { path: 'authors/details/:id', component: AuthorDetailsComponent, canActivate: [AccountGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];

export const routes = RouterModule.forRoot(APP_ROUTES);