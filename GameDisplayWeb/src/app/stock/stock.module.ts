import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

import { StockRoutingModule } from './stock-routing.module';
import { QuotationComponent } from './quotation/quotation.component';
import { MonitorComponent } from './monitor/monitor.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    StockRoutingModule,
    NgxEchartsModule
  ],
  declarations: [
    QuotationComponent,
    MonitorComponent,
    DetailComponent
  ]
})
export class StockModule { }
