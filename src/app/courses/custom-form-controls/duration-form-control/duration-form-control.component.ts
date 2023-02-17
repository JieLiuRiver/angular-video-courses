import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

@Component({
  selector: 'app-duration-form-control',
  templateUrl: './duration-form-control.component.html',
  styleUrls: ['./duration-form-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationFormControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DurationFormControlComponent),
      multi: true
    }
  ]
})
export class DurationFormControlComponent implements ControlValueAccessor, Validator {
  private innerValue: string = '';
  control: FormControl

  constructor() {
    this.control = new FormControl();
  }

  get value(): string {
    return this.innerValue;
  }

  set value(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.control.updateValueAndValidity()
      this.onChange(value);
    }
  }

  onChange: any = (value: any) => {};

  onTouched: any = () => {};

  writeValue(value: any): void {
    this.innerValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleChange(event: Event) {
    this.onChange((event.target as HTMLInputElement).value || '')
  }

  validate(control: FormControl) {
    let value = control.value
    if (control.value instanceof Event) {
      value = (control.value.target as HTMLInputElement).value;
    }
    let result: Record<string, boolean> | null = /^\d+$/.test(value) ? null : {'invalidType': true}
    if (!value) {
      result = {'required': true}
    }
    return result;
  }
}
