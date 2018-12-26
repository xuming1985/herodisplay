import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRouteGuard } from '../shared/auth/auth-route-guard';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  { path: 'user', component: UserComponent },
  { path: 'project', component: ProjectComponent, canActivate: [AppRouteGuard] },
  { path: 'list', component: ListComponent, canActivate: [AppRouteGuard]}
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BugRoutingModule { }
