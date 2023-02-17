import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';

@Directive({
  selector: '[appCourseStatusByCreationDate]'
})
export class CourseStatusByCreationDateDirective implements OnInit {
  @Input('appCourseStatusByCreationDate') public date?: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // console.log('diffDays', diffDays, 'hello',targetDate.format('YYYY-MM-dd'))
    if (!this.date) return
    const currentDate = dayjs()
    const targetDate = dayjs(this.date)
    const diffDays = targetDate.diff(currentDate, 'day')
    let  color
    // upcoming course
    if (diffDays > 0) {
      color = 'blue'
    } else if (diffDays <= 0 && Math.abs(diffDays) <= 14) {
      // fresh course
      color = 'green'
    }
    if (!color) return
    this.el.nativeElement.style.borderColor = color;
  }

}
