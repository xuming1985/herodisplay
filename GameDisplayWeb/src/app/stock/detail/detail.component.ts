import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StockService, StockMonitor, TimeDiagram } from '../../shared/service-proxy/stock.service'

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

    currentStock: StockMonitor;


    chartOption: any;

    constructor(private route: ActivatedRoute,
        private service: StockService,
        private location: Location) { }

    ngOnInit() {
        const code = this.route.snapshot.paramMap.get('code');
        this.service.getDetail(code)
            .subscribe(item => {
                this.currentStock = item;
                this.service.getTimeDiagram(code)
                    .subscribe(diagram => this.initDiagram(diagram));
            });
    }

    initDiagram(diagram: TimeDiagram): void {
        let max_up = diagram.maxValue > this.currentStock.yestodayClosePrice ? diagram.maxValue : this.currentStock.yestodayClosePrice;
        let min_down = this.currentStock.yestodayClosePrice > diagram.minValue ? diagram.minValue : this.currentStock.yestodayClosePrice;
        let offset = max_up - this.currentStock.yestodayClosePrice > this.currentStock.yestodayClosePrice - min_down ? max_up - this.currentStock.yestodayClosePrice : this.currentStock.yestodayClosePrice - min_down;
        let min_y = this.currentStock.yestodayClosePrice - offset - this.currentStock.yestodayClosePrice *0.01;
        let mxa_y = this.currentStock.yestodayClosePrice + offset + this.currentStock.yestodayClosePrice *0.01;

        this.chartOption = {
            title: {
                text: '未来一周气温变化',
                subtext: '纯属虚构'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['分时图']
            },
            grid: {

            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisTick: { onGap: false },
                splitLine: { show: true },
                interval: 60,
                data: this.getXData(),
                axisLabel:{
                    formatter:function(value){
                        
                        if(value.toString().Substring(3) == "00" || value.toString().Substring(3) =="30"){
                            return value;
                        }
                        return "";
                    }
                }
            },
            yAxis: [
                {
                    type: 'value',
                    min: min_y,
                    max: mxa_y
                }
            ],
            series: [
                {
                    name: '价格',  // 系列名称
                    type: 'line', // 图表类型，折线图line、散点图scatter、柱状图bar、饼图pie、雷达图radar
                    data: diagram.values,
                },
            ]
        };
    }

    getXData(): string[] {
        var res = [];
        res = res.concat(this.getX("09", 30, 59));
        res = res.concat(this.getX("10", 0, 59));
        res = res.concat(this.getX("11", 0, 30));
        res = res.concat(this.getX("13", 0, 59));
        res = res.concat(this.getX("14", 0, 59));
        res = res.concat(this.getX("15", 0, 0));
        return res;
    }

    getX(hour: string, minuteFrom: number, minuteTo: number): string[] {
        var res = [];
        for (let minute = minuteFrom; minute <= minuteTo; minute++) {
            if (minute < 10) {
                res.push(hour + ":0" + minute);
            } else {
                res.push(hour + ":" + minute);
            }

        }
        return res;
    }
}
