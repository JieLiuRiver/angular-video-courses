import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.css']
})
export class LoadMoreComponent implements OnInit {
  @Output('onLoadMore') onLoadMore: EventEmitter<undefined> =  new EventEmitter<undefined>()

  constructor() { }

  ngOnInit(): void {
  }

  loadMore(event: any) {
    this.onLoadMore.emit()
  }

}
