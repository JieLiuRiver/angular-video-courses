import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, of, Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, mergeMap, delay, skipWhile, filter } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';


@Component({
  selector: 'app-courses-header',
  templateUrl: './courses-header.component.html',
  styleUrls: ['./courses-header.component.css'],
})
export class CoursesHeaderComponent implements OnInit, OnDestroy {
  @Output('onSearchInput') onSearchInput: EventEmitter<string> =  new EventEmitter<string>()
  @Output('onPressSearchButton') onPressSearchButton: EventEmitter<string> =  new EventEmitter<string>()

  form: FormGroup

  // public inputValue:string = ""

  public keyUp = new Subject<any>();

  private subscription: Subscription

  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      inputValue: ['']
    })

    this.subscription = this.keyUp.pipe(
      map((event: any) => event.target?.value || ''),
      filter(str => str !== 'null' && str !== 'undefined'),
      skipWhile((search) => search.length < 3),
      debounceTime(500),
      distinctUntilChanged(),
      mergeMap(search => of(search).pipe(delay(500)))
    ).subscribe((search) => {
      // The name needs to match exactly for the query to succeed
      this.onSearchInput.emit(search)
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
