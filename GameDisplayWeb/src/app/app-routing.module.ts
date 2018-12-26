import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { BugComponent } from './bug/bug.component';
import { PortalComponent } from './portal/portal.component';
import { IntroduceComponent } from './introduce/introduce.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {
    path: 'portal',
    component: PortalComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    children: [
      {
        path: '',
        loadChildren: './account/account.module#AccountModule'
      },
    ]
  },
  {
    path: 'bug',
    component: BugComponent,
    children: [
      {
        path: '',
        loadChildren: './bug/bug.module#BugModule'
      },
    ]
  },
  {
    path: 'introduce',
    component: IntroduceComponent,
    children: [
      {
        path: '',
        loadChildren: './introduce/introduce.module#IntroduceModule'
      },
    ]
  },
  {
    path: 'stock',
    component: StockComponent,
    children: [
      {
        path: '',
        loadChildren: './stock/stock.module#StockModule'
      },
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
