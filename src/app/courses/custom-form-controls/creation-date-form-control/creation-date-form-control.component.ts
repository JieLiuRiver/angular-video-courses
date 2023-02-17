import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-creation-date-form-control',
  templateUrl: './creation-date-form-control.component.html',
  styleUrls: ['./creation-date-form-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreationDateFormControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CreationDateFormControlComponent),
      multi: true,
    },
  ],
})
export class CreationDateFormControlComponent
  implements ControlValueAccessor, Validator
{
  private innerValue: string = '';
  control: FormControl;

  constructor() {
    this.control = new FormControl();
  }

  get value(): string {
    return this.innerValue;
  }

  set value(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.control.updateValueAndValidity();
      this.onChange(value);
    }
  }

  onChange: any = (value: any) => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.innerValue = value;
  }

  handleChange(event: Event) {
    this.onChange((event.target as HTMLInputElement).value || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: FormControl) {
    const pattern = /^\d\d\/\d\d\/\d\d\d\d$/;
    let value = control.value;
    if (control.value instanceof Event) {
      value = (control.value.target as HTMLInputElement).value;
    }
    let result: Record<string, boolean> | null = pattern.test(value)
      ? null
      : { invalidFormat: true };
    if (!value) {
      result = { required: true };
    }
    return result;
  }
}
