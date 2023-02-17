import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs'
import { clone } from 'lodash';
import { CourseItem } from '../courses/course-item-model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(courses: CourseItem[], orderField: keyof CourseItem = 'creationDate'): CourseItem[] {
    let results: CourseItem[] = clone(courses)
    if (orderField === 'creationDate') {
      results = results.sort((a, b) => dayjs(a[orderField] as string).unix() - dayjs(b[orderField] as string).unix())
    }
    return results;
  }
}
