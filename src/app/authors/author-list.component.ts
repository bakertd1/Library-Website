import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Subscription } from 'rxjs/Rx';

import { AuthorTableFilterPipe } from './authortable-filter.pipe';
import { Author } from './author';
import { AuthorService } from './author.service';

@Component({
  selector: 'lib-author-list',
  templateUrl: './author-list.component.html'
})
export class AuthorListComponent implements OnInit, OnDestroy { 
  private authorId: number; //used to hold the id of the author to delete
  private authors: Author[] = [];
  private isAdmin = false;  //used to control rendering of edit and delete buttons

  private subscription: Subscription;

  //information used by datatable
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "lastName";
  public sortOrder = "asc";

  //get reference to modal to confirm author delete
  @ViewChild('modal') modal: ModalComponent;

  constructor(private authorService: AuthorService) { }

  ngOnInit() {
    this.authorService.getAuthors();
    
    this.subscription = this.authorService.authorsChanged.subscribe(
      (data: Author[]) => {
        this.authors = data;
        if(localStorage.getItem('is_admin') === 'true') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      }
    );
  }

  onDeleteClicked(id: number) {
    this.authorId = id;
    this.modal.open();
  }

  onDeleteConfirmed() {
    this.modal.close();
    this.authorService.deleteAuthor(this.authorId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
