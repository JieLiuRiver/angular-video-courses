import { Injectable } from '@angular/core';
import { IAuthor } from 'src/app/courses/course-item-model'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>('/api/authors')
  }
}
