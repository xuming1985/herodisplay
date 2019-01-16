import { Component, Injector, ViewEncapsulation, OnInit } from '@angular/core';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  menuItems: MenuItem[] = [
    new MenuItem("王者荣耀", "", "icon-diamond", "", [
      new MenuItem("游戏资料", "", "", "/introduce")
    ]),
    new MenuItem("股票", "", "icon-diamond", "", [
      new MenuItem("自选", "", "", "/stock/monitor"),
      new MenuItem("行情", "", "", "/stock/quotation")
    ]),
    new MenuItem("问题跟踪", "", "icon-diamond", "", [
      new MenuItem("问题列表", "", "", "/bug/list"),
      new MenuItem("问题统计", "", "", "/bug/statistics"),
      new MenuItem("用户管理", "", "", "/bug/user"),
      new MenuItem("项目管理", "", "", "/bug/project"),
      new MenuItem("个人设置", "", "", "/bug/setting"),
    ])
  ];

  constructor() { }

  ngOnInit() {
  }

  showMenuItem(menuItem): boolean {
    return true;
}

}
