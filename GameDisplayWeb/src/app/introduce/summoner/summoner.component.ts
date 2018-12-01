import { Component, OnInit } from '@angular/core';
import { SummonerService, Summoner } from '../../shared/service-proxy/summoner.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit {

  summoners: Summoner[] = [];
  selectedSummoner: Summoner = null;

  constructor(private service: SummonerService) {

  }

  ngOnInit() {
    this.getSummoners();
  }

  getSummoners(): void {
    this.service.getAll()
      .subscribe(summoners => {
        this.summoners = summoners;
        this.selectedSummoner = summoners[0];
      })
  }

  selectSummoner(current: Summoner):void{
    this.selectedSummoner = current;
  }
}
