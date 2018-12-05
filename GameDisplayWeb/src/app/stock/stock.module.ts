import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule } from './stock-routing.module';
import { QuotationComponent } from './quotation/quotation.component';
import { MonitorComponent } from './monitor/monitor.component';

@NgModule({
  imports: [
    CommonModule,
    StockRoutingModule
  ],
  declarations: [
    QuotationComponent,
    MonitorComponent
  ]
})
export class StockModule { }