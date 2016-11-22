import { Component, OnInit } from '@angular/core';

import { BookService } from './books/book.service';
import { AuthorService } from './authors/author.service';

@Component({
  selector: 'lib-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit { 
  constructor(private bookService: BookService, private authorService: AuthorService) { }
  
  ngOnInit() {
    //remove account information
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('token_type');
    localStorage.removeItem('userName');
  }
}
