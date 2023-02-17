import { Injectable } from '@angular/core';
import { CourseItem } from './course-item-model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const COURSE_DETAIL_KEY = makeStateKey<any>('course-detail');

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courses: CourseItem[] = [];

  constructor(private http: HttpClient, private transferState: TransferState) {}

  getCourses(
    start: number = 0,
    count: number = 5,
    textFragment?: string
  ): Observable<CourseItem[]> {
    return this.http.get<CourseItem[]>(
      `/api/courses?start=${start}&count=${count}${
        textFragment ? `&textFragment=${textFragment}` : ''
      }`
    );
  }

  getCourse(id: string): Observable<CourseItem | undefined> {
    const course = this.transferState.get(COURSE_DETAIL_KEY, null);
    return course
      ? of(course)
      : this.http.get<CourseItem>(`/api/courses/${id}`);
  }

  createCourse(course: CourseItem): Observable<CourseItem> {
    return this.http.post<CourseItem>('/api/courses', {
      ...course,
      name: course.title,
      date: course.creationDate,
      length: course.duration,
      isTopRated: course.topRated,
    });
  }

  updateCourse(
    id: string,
    course: Omit<CourseItem, 'id'>
  ): Observable<CourseItem> {
    return this.http.patch<CourseItem>(`/api/courses/${id}`, course);
  }

  removeCourse(id: string | number): Observable<boolean> {
    return this.http.delete<any>(`/api/courses/${id}`);
  }
}
