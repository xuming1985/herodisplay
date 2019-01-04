import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BugRoutingModule } from './/bug-routing.module';

import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { ListComponent } from './list/list.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';

import { AppSessionService } from '../shared/auth/app-session.service';

export function appInitializerFactory(injector: Injector) {
  return () => {

    return new Promise<boolean>((resolve, reject) => {
      var appSessionService: AppSessionService = injector.get(AppSessionService);
      appSessionService.init().then(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BugRoutingModule
  ],
  declarations: [
    BreadcrumbComponent,
    PaginationComponent,
    UserComponent,
    ProjectComponent,
    ListComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Injector],
      multi: true
    }
  ]
})
export class BugModule { }
