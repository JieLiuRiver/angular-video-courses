import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses/courses.component'
import { LoginComponent } from './login/login.component';
// import { AddCourseComponent } from './courses/add-course/add-course.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CoursesEnterComponent } from './courses/courses-enter/courses-enter.component';
import { AuthGuard } from './auth/auth.guard';
import { CourseResolver } from './core/resolvers/course.resolver';

const routes: Routes = [
  {
    path: 'courses',
    component:  CoursesEnterComponent,
    canActivate: [AuthGuard],
    data: {reuse: true},
    children: [
      {
        path: '',
        component: CoursesComponent,
        pathMatch: 'full',
        data: {reuse: true},
        title: 'Courses',
      },
      {
        path: 'new',
        title: 'New Course',
        data: {reuse: true},
        loadChildren: () => import("./courses/add-course/add-course.module").then(m => m.AddCourseModule)
      },
      {
        path: ':id',
        component: CourseDetailComponent,
        resolve: {
          course: CourseResolver,
        },
        title: 'Course Detail'
      },
    ]
  },
  {
    path: 'login',
    data: {reuse: true},
    component:  LoginComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
  providers: [CourseResolver]
})
export class AppRoutingModule { }
