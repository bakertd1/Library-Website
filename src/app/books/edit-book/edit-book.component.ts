import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Author } from '../../authors/author';
import { Book } from '../book';
import { AuthorService } from '../../authors/author.service';
import { BookService } from '../book.service';

@Component({
  selector: 'lib-edit-book',
  templateUrl: './edit-book.component.html'
})
export class EditBookComponent implements OnInit, OnDestroy {
  private bookForm: FormGroup;

  private bookSubscription: Subscription; //used to get book data from the api
  private authorSubscription: Subscription; //used to get author data from the api

  private id: number;
  private book: Book = {
    title: '',
    authorId: 0,
    publisher: '',
    publicationDate: new Date(),
    numberOfPages: 0
  };
  private authors: Author[] = [];

  constructor(private bookService: BookService, 
              private authorService: AuthorService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { 
    
  }

  ngOnInit() {

    //populate the author select box
    this.authorService.getAuthors();
    this.authorSubscription = this.authorService.authorsChanged.subscribe(
      data => this.authors = data
    );

    this.bookForm = new FormGroup({
      title: new FormControl(this.book.title, Validators.required),
      authorId: new FormControl(this.book.authorId, Validators.required),
      publisher: new FormControl(this.book.publisher, Validators.required),
      publicationDate: new FormControl(this.book.publicationDate, Validators.required),
      numberOfPages: new FormControl(this.book.numberOfPages, Validators.required)
    });

    //get the id of the book from the url
    this.id = this.activatedRoute.snapshot.params['id'];

    this.bookService.getBook(this.id);
    this.bookSubscription = this.bookService.booksChanged.subscribe(
      (data: Book) => {
        this.book = data;

        //convert the date to a string format that is readible by an html date input
        let pubDate = new Date(this.book.publicationDate);
        let pubDateString = pubDate.getFullYear() + "-" 
                            + (pubDate.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + "-" 
                            + (pubDate.getDate()).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        
        //populate the form with the current book values
        this.bookForm.controls['title'].setValue(this.book.title);
        this.bookForm.controls['authorId'].setValue(this.book.authorId);
        this.bookForm.controls['publisher'].setValue(this.book.publisher);
        this.bookForm.controls['publicationDate'].setValue(pubDateString);
        this.bookForm.controls['numberOfPages'].setValue(this.book.numberOfPages);
      }
    );
  }

  onSubmit() {
    //include the id of the book, otherwise the api will return 400 Bad Request
    this.bookForm.value.id = this.book.id;

    if(this.bookForm.valid) {
      this.bookService.updateBook(this.bookForm.value);
      this.router.navigate(['/books']);
    }
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }
}
