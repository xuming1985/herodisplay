import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { StockService, StockMonitor } from '../../shared/service-proxy/stock.service'

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  stockMonitors: StockMonitor[] = [];
  selectedStockMonitor: StockMonitor = null;

  constructor(private service: StockService,
    private router: Router) { }

  ngOnInit() {
    this.getStockMonitors();
  }

  getStockMonitors(): void {
    this.service.getAll()
      .subscribe(monitors => {
        this.stockMonitors = monitors;
      })
  }

  routeToDetail(item: StockMonitor):void{
    let code = item.category + item.code;
    this.router.navigate(['stock','detail',code])
  }

  remove(monitor: StockMonitor):void{
    
  }

}


