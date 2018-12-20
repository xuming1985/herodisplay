import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugRoutingModule } from './/bug-routing.module';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    BugRoutingModule
  ],
  declarations: [UserComponent, ProjectComponent, ListComponent]
})
export class BugModule { }
