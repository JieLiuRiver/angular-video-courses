import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';
@NgModule({
    imports: [
      AppModule,
      BrowserModule.withServerTransition({ appId: 'ssr-example' }),
    ],
    bootstrap: [AppComponent]
})
export class BrowserAppModule { }
