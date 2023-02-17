import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { appReducer } from './store/app.state';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { BreadcrumbMenusComponent } from './breadcrumb-menus/breadcrumb-menus.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLogoffComponent } from './user-logoff/user-logoff.component';
import { SpaceComponent } from './space/space.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component';
import { LoginComponent } from './login/login.component';
import { IfAuthDirective } from './directives/if-auth.directive';

import { CoursesComponent } from './courses/courses/courses.component';
import { CourseItemComponent } from './courses/course-item/course-item.component';
import { LoadMoreComponent } from './courses/load-more/load-more.component';
import { CoursesHeaderComponent } from './courses/courses-header/courses-header.component';
// import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { CourseNameFilterPipe } from './pipes/course-name-filter.pipe';
import { CourseStatusByCreationDateDirective } from './directives/course-status-by-creation-date.directive';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CoursesEnterComponent } from './courses/courses-enter/courses-enter.component';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';
import { LoadingComponent } from './loading/loading.component';
import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';
import { AuthorsFormControlModule } from './courses/custom-form-controls/authors-form-control/authors-form-control.module';
import { DurationFormControlModule } from './courses/custom-form-controls/duration-form-control/duration-form-control.module';
import { CreationDateFormControlModule } from './courses/custom-form-controls/creation-date-form-control/creation-date-form-control.module';
import { CoreModule } from './core/core.module';
import { CourseEffects } from './store/course/course.effect';
import { SharedModule } from './shared/shared.module';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    FooterComponent,
    LogoComponent,
    BreadcrumbMenusComponent,
    UserLoginComponent,
    UserLogoffComponent,
    SpaceComponent,
    ContentLayoutComponent,
    LoginComponent,
    CoursesComponent,
    CourseItemComponent,
    LoadMoreComponent,
    CoursesHeaderComponent,
    // DurationPipe,
    OrderByPipe,
    CourseNameFilterPipe,
    CourseStatusByCreationDateDirective,
    IfAuthDirective,
    ConfirmationDialogComponent,
    CourseListComponent,
    NotFoundComponent,
    CourseDetailComponent,
    CoursesEnterComponent,
    LoadingComponent,
  ],
  imports: [
    AuthorsFormControlModule,
    DurationFormControlModule,
    CreationDateFormControlModule,
    SharedModule,
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([CourseEffects]),
  ],
  bootstrap: [AppComponent],
  providers: [
    LocalStorageService,
    ConfirmationDialogService,
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
  ],
  entryComponents: [ConfirmationDialogComponent],
})
export class AppModule {}
