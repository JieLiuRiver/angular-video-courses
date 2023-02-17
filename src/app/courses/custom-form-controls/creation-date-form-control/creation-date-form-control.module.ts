import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreationDateFormControlComponent } from './creation-date-form-control.component';

@NgModule({
  declarations: [CreationDateFormControlComponent],
  imports: [FormsModule, SharedModule],
  exports: [CreationDateFormControlComponent],
})
export class CreationDateFormControlModule {}
