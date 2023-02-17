import { Pipe, PipeTransform } from '@angular/core';
import { CourseItem } from '../courses/course-item-model';

@Pipe({
  name: 'courseNameFilter'
})
export class CourseNameFilterPipe implements PipeTransform {

  transform(courses: CourseItem[], targetField: {
    field?: keyof CourseItem;
    value?: string;
  } = {}): CourseItem[] {
    if (!Object.keys(targetField).length) return courses
    return courses.filter((course) => {
      return String(course[targetField.field!]).toLocaleLowerCase().includes((targetField.value!).toLocaleLowerCase())
    });
  }
}
