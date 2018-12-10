import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorComponent } from './monitor/monitor.component';
import { DetailComponent } from './detail/detail.component';
import { QuotationComponent } from './quotation/quotation.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'hero',
    pathMatch: 'full'
  },
  { path: 'monitor', component: MonitorComponent },
  { path: 'quotation', component: QuotationComponent },
  { path: 'detail/:code', component: DetailComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StockRoutingModule { }
