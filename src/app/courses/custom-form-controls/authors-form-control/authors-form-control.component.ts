import { Component, forwardRef, OnDestroy } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getAuthors } from 'src/app/store/course/course.selectors';
import { Observable, Subscription } from 'rxjs';
import { IAuthor } from '../../course-item-model';

@Component({
  selector: 'app-authors-form-control',
  templateUrl: './authors-form-control.component.html',
  styleUrls: ['./authors-form-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsFormControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AuthorsFormControlComponent),
      multi: true
    }
  ]
})
export class AuthorsFormControlComponent implements ControlValueAccessor, Validator, OnDestroy {
  private innerValue: string[] = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    allowSearchFilter: false
  }
  control: FormControl

  authorsSubscription: Subscription

  authors: IAuthor[] = []

  constructor(private store: Store<AppState>) {
    this.control = new FormControl();
    this.authorsSubscription = this.store.select(getAuthors).subscribe(list => this.authors = list || [])
  }

  get value(): string[] {
    return this.innerValue;
  }

  set value(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.control.updateValueAndValidity()
      this.onChange(value);
    }
  }

  onItemSelect(item: any) {
    this.control.updateValueAndValidity()
  }

  private getSelectedValuesByOptions(select: HTMLSelectElement) {
    return [...Array.from(select.options)]
    .filter(option => option.selected)
    .map(option => option.value);
  }

  onChange: any = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    this.value = this.getSelectedValuesByOptions(select)
  };

  onTouched: any = () => {};

  writeValue(value: string[]): void {
    this.innerValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: FormControl) {
    let value = control.value
    if (control.value instanceof Event) {
      value = (control.value.target as HTMLInputElement).value;
    }
    let result: Record<string, boolean> | null = value?.length ? null : {'atLeastSelectOne': true}
    return result;
  }

  ngOnDestroy(): void {
    this.authorsSubscription?.unsubscribe()
  }
}
