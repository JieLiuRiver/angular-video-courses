import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DurationFormControlComponent } from './duration-form-control.component';

@NgModule({
  declarations: [DurationFormControlComponent],
  imports: [FormsModule, SharedModule],
  exports: [DurationFormControlComponent],
})
export class DurationFormControlModule {}
