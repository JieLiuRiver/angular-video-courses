import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getCourses } from 'src/app/store/course/course.selectors';
import { CourseItem } from '../course-item-model';

// This is dumb component

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent implements OnInit {
  // @Input() list: CourseItem[] = [];
  @Output('onLoadMoreEvent') onLoadMoreEvent: EventEmitter<undefined> =  new EventEmitter<undefined>()
  @Output('onDeleteCourse') onDeleteCourse: EventEmitter<string> =  new EventEmitter<string>()
  @Output('onEditCourse') onEditCourse: EventEmitter<string> =  new EventEmitter<string>()
  @Output('onSearch') onSearch: EventEmitter<string> =  new EventEmitter<string>()
  @Output('onPressSearchButton') onPressSearchButton: EventEmitter<string> =  new EventEmitter<string>()

  courses$: Observable<CourseItem[]>

  constructor(private store: Store<AppState>) {
    this.courses$ = this.store.select(getCourses)
  }

  ngOnInit(): void {
  }

  doDeleteCourseTask(id: any) {
    this.onDeleteCourse.emit(id)
  }

  doEditCourseTask(id: any) {
    this.onEditCourse.emit(id)
  }

  doSearchInput(keyword: string) {
    this.onSearch.emit(keyword)
  }

  doPressSearchButton(keyword: string) {
    this.onPressSearchButton.emit(keyword)
  }

  onLoadMore() {
    this.onLoadMoreEvent.emit()
  }

  trackByItem(_: any, item: CourseItem) {
    return item.id
  }
}
