import { NgModule } from '@angular/core';

import { DurationPipe } from 'src/app/pipes/duration.pipe';

@NgModule({
  declarations: [DurationPipe],
  imports: [],
  providers: [],
  exports: [DurationPipe]
})
export class CoreModule { }
