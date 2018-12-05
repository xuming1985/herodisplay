import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { IntroduceComponent } from './introduce/introduce.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {
    path: 'portal',
    component: PortalComponent
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
