import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnInit {
  @Input() x?: string;
  @Input() y?: string;
  constructor() { }

  ngOnInit(): void {
  }

}
