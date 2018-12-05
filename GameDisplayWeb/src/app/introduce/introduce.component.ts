import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {

  submenu: number = 1;

  constructor() { }

  ngOnInit() {
  }


  subMenuChange(menu: number): void {
    this.submenu = menu;
  }

}
