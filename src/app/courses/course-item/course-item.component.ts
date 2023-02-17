import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CourseItem } from '../course-item-model';

// This is dumb component

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent implements OnInit {
  @Input() info!: CourseItem
  @Output('onDeleteCourse') onDelete: EventEmitter<string | number> =  new EventEmitter<string | number>()
  @Output('onEditCourse') onEdit: EventEmitter<string | number> =  new EventEmitter<string | number>()
  constructor() { }

  ngOnInit(): void {

  }

  doEdit(event: Event) {
    this.onEdit.emit(this.info?.id)
  }

  doDelete(event: Event) {
    this.onDelete.emit(this.info?.id)
  }

}
