import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { BugRoutingModule } from './/bug-routing.module';

import { ProjectComponent } from './project/project.component';
import { ListComponent } from './list/list.component';

import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';

import { PaginationComponent } from '../shared/pagination/pagination.component';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';

import { AppSessionService } from '../shared/auth/app-session.service';

import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { AddModuleProjectComponent } from './project/add-module-project/add-module-project.component';
import { AddMemberProjectComponent } from './project/add-member-project/add-member-project.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';


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
    ModalModule,
    ModalModule.forRoot(),
    BugRoutingModule
  ],
  declarations: [
    BreadcrumbComponent,
    PaginationComponent,
    ProjectComponent,
    ListComponent,
    UserComponent,
    CreateUserComponent,
    EditUserComponent,
    EditProjectComponent,
    AddModuleProjectComponent,
    AddMemberProjectComponent,
    ResetPasswordComponent
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
