import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BookListComponent } from './books/book-list.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { AuthorListComponent } from './authors/author-list.component';
import { AddAuthorComponent } from './authors/add-author/add-author.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'books', component: BookListComponent },
    { path: 'books/new', component: AddBookComponent },
    { path: 'authors', component: AuthorListComponent },
    { path: 'authors/new', component: AddAuthorComponent }
];

export const routes = RouterModule.forRoot(APP_ROUTES);