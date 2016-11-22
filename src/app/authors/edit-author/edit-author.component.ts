import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Author } from '../../authors/author';
import { AuthorService } from '../../authors/author.service';

@Component({
  selector: 'lib-edit-author',
  templateUrl: './edit-author.component.html'
})
export class EditAuthorComponent implements OnInit, OnDestroy {
  private authorForm: FormGroup;
  private subscription: Subscription;

  private id: number;
  private author: Author = {
    firstName: '',
    lastName: '',
    birthdate: new Date()
  };

  constructor(private router: Router, 
              private authorService: AuthorService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.authorForm = new FormGroup({
      firstName: new FormControl(this.author.firstName, Validators.required),
      lastName: new FormControl(this.author.lastName, Validators.required),
      birthdate: new FormControl(this.author.birthdate, Validators.required),
      deathdate: new FormControl()
    });

    //get the id of the author from thr url
    this.id = this.activatedRoute.snapshot.params['id'];

    this.authorService.getAuthor(this.id);
    this.subscription = this.authorService.authorsChanged.subscribe(
      (data: Author) => {
        this.author = data;

        //convert birthdate to a string readable by an html date input
        let birthdate = new Date(this.author.birthdate);
        let birthdateString = birthdate.getFullYear() + "-" 
                            + (birthdate.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + "-" 
                            + (birthdate.getDate()).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

        //convert deathdate to a string readable by an html date input
        let deathdate = new Date(this.author.deathdate);
        let deathdateString = deathdate.getFullYear() + "-" 
                            + (deathdate.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + "-" 
                            + (deathdate.getDate()).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        
        //populate the form with current author values
        this.authorForm.controls['firstName'].setValue(this.author.firstName);
        this.authorForm.controls['lastName'].setValue(this.author.lastName);
        this.authorForm.controls['birthdate'].setValue(birthdateString);

        if(this.author.deathdate !== null) {
          this.authorForm.controls['deathdate'].setValue(deathdateString);
        }
      }
    );
  }

  onSubmit() {
    //include the id of the author, otherwise the api will return 400 Bad Request
    this.authorForm.value.id = this.author.id;

    if(this.authorForm.valid) {
      this.authorService.updateAuthor(this.authorForm.value);
      this.router.navigate(['/authors']);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
