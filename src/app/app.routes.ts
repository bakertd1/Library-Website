import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BookListComponent } from './books/book-list.component';
import { AuthorListComponent } from './authors/author-list.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'books', component: BookListComponent },
    { path: 'authors', component: AuthorListComponent }
];

export const routes = RouterModule.forRoot(APP_ROUTES);