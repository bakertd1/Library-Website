import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { RequiredIconComponent } from '../../shared/required-icon/required-icon.component';
import { AuthorService } from '../../authors/author.service';
import { BookService } from '../book.service';
import { Author } from '../../authors/author';
import { Book } from '../book';

@Component({
  selector: 'lib-add-book',
  templateUrl: './add-book.component.html'
})
export class AddBookComponent implements OnInit, OnDestroy {
  private authors: Author[] = [];
  private subscription: Subscription;

  constructor(private router: Router, 
              private authorService: AuthorService, 
              private bookService: BookService) { }

  ngOnInit() {
    this.authorService.getAuthors();
    this.subscription = this.authorService.authorsChanged.subscribe(
      (data: Author[]) => this.authors = data
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(data: Book) {
    this.bookService.addBook(data);
    this.router.navigate(['/books']);
  }

}
