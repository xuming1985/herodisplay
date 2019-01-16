import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRouteGuard } from '../shared/auth/auth-route-guard';
import { ListComponent } from './list/list.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingComponent } from './setting/setting.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent, canActivate: [AppRouteGuard] },
  { path: 'list', component: ListComponent, canActivate: [AppRouteGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AppRouteGuard] },
  { path: 'setting', component: SettingComponent, canActivate: [AppRouteGuard] },
  { path: 'user', component: UserComponent, canActivate: [AppRouteGuard] },
  { path: 'project', component: ProjectComponent, canActivate: [AppRouteGuard] }

]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BugRoutingModule { }
