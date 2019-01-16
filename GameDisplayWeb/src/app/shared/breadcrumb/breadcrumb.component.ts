import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  constructor(private router: Router) {

  }

  @Input() homeRoute: string = "";
  @Input() moduleName: string = "模块";
  @Input() pageName: string = "页面";

  ngOnInit() {
  }

  routeToHome(): void {
    console.log(this.homeRoute);
    this.router.navigate([this.homeRoute])
  }

}
