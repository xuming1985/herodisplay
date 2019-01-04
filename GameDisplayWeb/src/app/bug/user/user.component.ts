import { Component, OnInit, ViewChild } from '@angular/core';
import { PagedInput } from '../../shared/service-proxy/base.service'
import { UserService, BUserQueryInput, BUserDto } from '../../shared/service-proxy/bug.service'
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private users: BUserDto[] = [];
  private queryInput: BUserQueryInput = new BUserQueryInput();
  private start: number;

  @ViewChild(PaginationComponent)
  private paginationComponent: PaginationComponent;

  constructor(private service: UserService) {

  }

  ngOnInit() {

  }

  getAllUsers(): void {
    this.service.getAllUsers(this.queryInput)
      .subscribe(result => {
        this.users = result.data;
        this.paginationComponent.updateInfo(result.total);
        this.start = (this.queryInput.page - 1) * this.queryInput.pageSize;
      })
  }

  onPageChanged(pageInfo: PagedInput): void {
    this.queryInput.page = pageInfo.page;
    this.queryInput.pageSize = pageInfo.pageSize;
    this.getAllUsers();
  }

}
