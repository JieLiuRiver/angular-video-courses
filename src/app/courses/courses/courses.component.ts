import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';
import { LoadingService } from 'src/app/loading/loading.service';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { CourseNameFilterPipe } from 'src/app/pipes/course-name-filter.pipe';
import { CourseService } from '../courses.service';
import { Router } from '@angular/router';
import { finalize, of, catchError } from 'rxjs';
import {
  ESaveType,
  removeCourse,
  removeCourseResult,
  saveCourse,
} from 'src/app/store/course/course.actions';
import { selectRemoveCourseResult } from 'src/app/store/course/course.selectors';
import { CourseItem } from '../course-item-model';
import { TranslateService } from '@ngx-translate/core';
import { getValue } from 'src/app/utils/Observale';

// This is smark component
@Component({
  selector: 'app-course',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [CourseNameFilterPipe],
})
export class CoursesComponent implements OnInit {
  courses: CourseItem[] = [];
  loading: boolean = false;

  removeCourseResult$ = this.store.select(selectRemoveCourseResult);

  constructor(
    private store: Store<AppState>,
    private courseService: CourseService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router,
    public loadingService: LoadingService,
    private translate: TranslateService
  ) {
    this.removeCourseResult$.subscribe((result) => {
      if (result) {
        this.loadingService.toggleLoading(false);
        this.getCourses(ESaveType.Replace);
        this.store.dispatch(removeCourseResult({ payload: false }));
      }
    });
  }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(saveType: ESaveType = ESaveType.Push) {
    this.loadingService.toggleLoading(true);
    this.courseService
      .getCourses()
      .pipe(
        catchError((error) => {
          console.log(error);
          return of([]);
        }),
        finalize(() => this.loadingService.toggleLoading(false))
      )
      .subscribe((courses) => {
        this.store.dispatch(
          saveCourse({
            payload: courses,
            saveType,
          })
        );
        this.courses = courses;
      });
  }

  async doDeleteCourseTask(id: string | number) {
    const confirmed = await this.confirmationDialogService.confirm(
      (getValue(this.translate.get('CONFIRM_TITLE'))?.value || '') as string,
      (getValue(this.translate.get('CONFIRM_CONTENT'))?.value || '') as string,
      (getValue(this.translate.get('CONFIRM_OK_BUTTON'))?.value ||
        '') as string,
      (getValue(this.translate.get('CONFIRM_CANCEL_BUTTON'))?.value ||
        '') as string
    );
    if (!confirmed) return;
    this.loadingService.toggleLoading(true);
    this.store.dispatch(removeCourse({ payload: id }));
  }

  doEditCourseTask(id: string) {
    this.router.navigate(['/courses/' + id]);
  }

  onSearchInput(keyword: string) {
    this.loadingService.toggleLoading(true);
    this.courseService
      .getCourses(0, !keyword ? 5 : 100, keyword)
      .subscribe((data) => {
        this.courses = data;
        this.store.dispatch(
          saveCourse({
            payload: data,
            saveType: ESaveType.Replace,
          })
        );
        this.loadingService.toggleLoading(false);
      });
  }

  onPressSearchButton(keyword: string) {
    this.onSearchInput(keyword);
  }

  onLoadMoreEvent() {
    this.loadingService.toggleLoading(true);
    this.courseService
      .getCourses()
      .pipe(
        catchError((error) => {
          console.log(error);
          return of([]);
        }),
        finalize(() => this.loadingService.toggleLoading(false))
      )
      .subscribe((courses) => {
        const results = [...this.courses, ...courses];
        this.store.dispatch(
          saveCourse({
            payload: results,
            saveType: ESaveType.Push,
          })
        );
        this.courses = results;
      });
  }
}
