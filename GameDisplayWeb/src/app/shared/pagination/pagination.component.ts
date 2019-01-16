import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {

  @Output() pageChanged = new EventEmitter<PagedInput>();
  pageInfo: PagedInput = new PagedInput();
  pageCount: number;
  pageShowInfo: string;

  constructor() { }

  ngOnInit() {
    this.pageChanged.emit(this.pageInfo);
  }

  //首页
  pageFirst(): void {
    this.pageInfo.page = 1;
    this.pageChanged.emit(this.pageInfo);
  }

  //上一页
  pagePre(): void {
    if (this.pageInfo.page > 1) {
      this.pageInfo.page--;
    }
    this.pageChanged.emit(this.pageInfo);
  }

  //下一页
  pageNext(): void {
    if (this.pageInfo.page < this.pageCount) {
      this.pageInfo.page++;
    }
    this.pageChanged.emit(this.pageInfo);
  }

  //尾页
  pageLast(): void {
    this.pageInfo.page = this.pageCount;
    this.pageChanged.emit(this.pageInfo);
  }

  updateInfo(total: number): void {
    this.pageCount = Math.ceil(total / this.pageInfo.pageSize);
    let start = (this.pageInfo.page - 1) * this.pageInfo.pageSize + 1;
    let end = this.pageInfo.page * this.pageInfo.pageSize;
    if (this.pageInfo.page >= this.pageCount) {
      end = total;
    }

    this.pageShowInfo = "Show " + start + " to " + end + " of " + total + " items";
  }

}

export class PagedInput {
  page: number;
  pageSize: number;

  constructor() {
    this.page = 1;
    this.pageSize = 10;
  }
}
