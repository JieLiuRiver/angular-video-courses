import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { catchError, finalize, of } from 'rxjs';
// import { LoadingService } from 'src/app/loading/loading.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  addCourse,
  addCourseResult,
} from 'src/app/store/course/course.actions';
import { selectAddCourseResult } from 'src/app/store/course/course.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../courses.service';
import { DurationPipe } from '../../pipes/duration.pipe';
import { I18Service } from '../../services/i18.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  public title: string = '';
  public description: string = '';
  public duration: number = 0;
  public creationDate: string = '';

  public form: FormGroup;
  submiting: boolean = false;

  addCourseResult$ = this.store.select(selectAddCourseResult);

  constructor(
    private coursesService: CourseService,
    private router: Router,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private i18Service: I18Service,
    private translate: TranslateService
  ) {
    this.addCourseResult$.subscribe((result) => {
      if (result) {
        this.submiting = false;
        this.router.navigate(['courses']);
        this.store.dispatch(addCourseResult({ payload: false }));
      }
    });
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      creationDate: [''],
      duration: [0],
      authors: [[]],
    });
  }

  ngOnInit(): void {
    this.i18Service.localEvent.subscribe((locale) => {
      this.translate.use(locale);
    });
  }

  doSave() {
    if (!this.form.valid) return;
    this.submiting = true;
    this.store.dispatch(
      addCourse({
        payload: {
          id: `${Date.now()}` + this.coursesService.courses.length,
          title: this.title,
          description: this.description,
          duration: this.duration,
          creationDate: this.creationDate,
          topRated: false,
        },
      })
    );

    // this.coursesService
    //   .createCourse({
    //     id: `${Date.now()}` + this.coursesService.courses.length,
    //     title: this.title,
    //     description: this.description,
    //     duration: this.duration,
    //     creationDate: this.creationDate,
    //     topRated: false,
    //   })
    //   .pipe(
    //     catchError((error) => {
    //       console.log(error);
    //       return of([]);
    //     }),
    //     finalize(() => {
    //       this.submiting = false;
    //       this.router.navigate(['courses']);
    //     })
    //   )
    //   .subscribe(() => null);
  }
}
