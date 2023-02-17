import { NgModule } from '@angular/core';
import { AuthorsFormControlComponent } from './authors-form-control.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthorsFormControlComponent],
  imports: [NgMultiSelectDropDownModule, FormsModule],
  exports: [AuthorsFormControlComponent],
})
export class AuthorsFormControlModule {}
