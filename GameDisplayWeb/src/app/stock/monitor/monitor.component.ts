import { Component, OnInit } from '@angular/core';
import { StockService, StockMonitor } from '../../shared/service-proxy/stock.service'

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  stockMonitors: StockMonitor[] = [];
  selectedStockMonitor: StockMonitor = null;

  constructor(private service: StockService) { }

  ngOnInit() {
    this.getStockMonitors();
  }

  getStockMonitors(): void {
    this.service.getAll()
      .subscribe(monitors => {
        this.stockMonitors = monitors;
      })
  }

  remove(monitor: StockMonitor):void{
    
  }

}


