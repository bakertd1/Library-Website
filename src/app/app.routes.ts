import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BookListComponent } from './books/book-list.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { AuthorListComponent } from './authors/author-list.component';
import { AddAuthorComponent } from './authors/add-author/add-author.component';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';
import { EditAuthorComponent } from './authors/edit-author/edit-author.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { AccountGuard } from './account/account.guard';
import { AdminGuard } from './account/admin.guard';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'books', component: BookListComponent, canActivate: [AccountGuard] },
    { path: 'books/new', component: AddBookComponent, canActivate: [AdminGuard, AccountGuard] },
    { path: 'books/details/:id', component: BookDetailsComponent, canActivate: [AccountGuard] },
    { path: 'books/edit/:id', component: EditBookComponent, canActivate: [AdminGuard, AccountGuard] },
    { path: 'authors', component: AuthorListComponent, canActivate: [AccountGuard] },
    { path: 'authors/new', component: AddAuthorComponent, canActivate: [AdminGuard, AccountGuard] },
    { path: 'authors/details/:id', component: AuthorDetailsComponent, canActivate: [AccountGuard] },
    { path: 'authors/edit/:id', component: EditAuthorComponent, canActivate: [AdminGuard, AccountGuard] },
    { path: 'newPassword', component: ChangePasswordComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];

export const routes = RouterModule.forRoot(APP_ROUTES);