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
    //prepopulate array of books and authors for each component to use
    this.bookService.getBooks();
    this.authorService.getAuthors();
  }
}
