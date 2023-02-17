import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { LoadingService } from 'src/app/loading/loading.service';
import { Store } from '@ngrx/store';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { AppState } from 'src/app/store/app.state';
import {
  saveEditCourseInfo,
  updateCourse,
  updateCourseResult,
} from 'src/app/store/course/course.actions';
import { CourseItem } from '../course-item-model';
import {
  getEditCoursesInfo,
  selectUpdateCourseResult,
} from 'src/app/store/course/course.selectors';
import { CourseService } from '../courses.service';
const STATE_KEY_COURSE_DETAIL = makeStateKey('course-detail');

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  public title: string = '';
  public description: string = '';
  public duration: number = 0;
  public creationDate: string = '';
  public id: string = '';

  private courseInfo$: Observable<CourseItem | undefined>;
  private courseInfoSubscription = new Subscription();

  updateCourseResult$ = this.store.select(selectUpdateCourseResult);

  public form: FormGroup;

  constructor(
    private coursesService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    public loadingService: LoadingService,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private transferState: TransferState
  ) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      creationDate: [],
      duration: [0],
      authors: [[]],
    });

    this.courseInfo$ = this.store.select(getEditCoursesInfo);
    this.courseInfoSubscription.add(
      this.courseInfo$.subscribe((info) => {
        const { title, description, creationDate, duration, authors } =
          info || {};
        this.form.setValue({
          title: title,
          description: description,
          creationDate: dayjs(creationDate).format('DD/MM/YYYY'),
          duration: duration || 0,
          authors: authors,
        });
        setTimeout(() => {
          this.form.updateValueAndValidity();
        }, 0);
      })
    );

    this.updateCourseResult$.subscribe((result) => {
      if (result) {
        this.loadingService.toggleLoading(false);
        this.router.navigate(['courses']);
        this.store.dispatch(updateCourseResult({ payload: false }));
      }
    });
  }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      const detailState: any = this.transferState.get(
        STATE_KEY_COURSE_DETAIL,
        null
      );
      if (!detailState) {
        try {
          this.loadingService.toggleLoading(true);
          this.coursesService.getCourse(this.id).subscribe((data) => {
            const { name, description, length, date, isTopRated, authors } =
              data || {};
            this.store.dispatch(
              saveEditCourseInfo({
                payload: {
                  id: this.id,
                  title: name || '',
                  description: description || '',
                  duration: length || 0,
                  creationDate: dayjs(date).format('YYYY-MM-DD'),
                  authors: authors || [],
                  topRated: !!isTopRated,
                },
              })
            );
          });
        } catch (error) {
          console.log(error);
        } finally {
          this.loadingService.toggleLoading(false);
        }
      } else {
        this.store.dispatch(
          saveEditCourseInfo({
            payload: {
              id: this.id,
              title: detailState.name || '',
              description: detailState.description || '',
              duration: length || 0,
              creationDate: dayjs(detailState.date).format('YYYY-MM-DD'),
              authors: detailState.authors || [],
              topRated: !!detailState.isTopRated,
            },
          })
        );
      }
    }
  }

  doSave() {
    if (
      !this.title ||
      !this.description ||
      typeof this.duration === 'undefined' ||
      !this.creationDate
    )
      return;

    this.loadingService.toggleLoading(true);
    this.store.dispatch(
      updateCourse({
        payload: {
          id: this.id,
          course: {
            title: this.title,
            description: this.description,
            duration: this.duration,
            creationDate: this.creationDate,
            topRated: false,
          },
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.courseInfoSubscription?.unsubscribe();
  }
}
