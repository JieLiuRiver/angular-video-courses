import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCourseComponent } from './add-course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { AddCourseRoutingModule } from './add-course-routing.module';
import { AuthorsFormControlModule } from '../custom-form-controls/authors-form-control/authors-form-control.module';
import { CreationDateFormControlModule } from '../custom-form-controls/creation-date-form-control/creation-date-form-control.module';
import { DurationFormControlModule } from '../custom-form-controls/duration-form-control/duration-form-control.module';
import { CoreModule } from 'src/app/core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from 'src/app/store/course/course.effect';

@NgModule({
  imports: [
    AuthorsFormControlModule,
    CreationDateFormControlModule,
    DurationFormControlModule,
    AddCourseRoutingModule,
    EffectsModule.forFeature([CourseEffects]),
    CoreModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AddCourseComponent],
})
export class AddCourseModule {}
