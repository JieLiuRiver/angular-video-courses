import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { PLATFORM_ID, APP_ID } from '@angular/core';
import { UNIVERSAL_LOCAL_STORAGE } from '@ng-web-apis/universal';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: UNIVERSAL_LOCAL_STORAGE,
      useFactory: (platformId: any, appId: any) => {
        return typeof window !== 'undefined' ? window.localStorage : {};
      },
      deps: [PLATFORM_ID, APP_ID]
    }
  ]
})
export class AppServerModule {}
