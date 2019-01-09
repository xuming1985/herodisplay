import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

import { PagedInput } from '../../shared/service-proxy/base.service'
import { UserService, BUserQueryInput, BUserDto } from '../../shared/service-proxy/bug.service'
import { PagedListingComponentBase } from '../../shared/pagination/paged-listing-component-base';

import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends PagedListingComponentBase {

  private users: BUserDto[] = [];
  private queryInput: BUserQueryInput = new BUserQueryInput();

  @ViewChild('createUserModal') createUserModal: CreateUserComponent;
  @ViewChild('editUserModal') editUserModal: EditUserComponent;
  @ViewChild('resetPasswordModal') resetPasswordModal: ResetPasswordComponent;


  constructor(
    private service: UserService,
    public toastr: ToastrService) {
    super(toastr)
  }

  onPageChanged(pageInfo: PagedInput): void {
    this.queryInput.page = pageInfo.page;
    this.queryInput.pageSize = pageInfo.pageSize;
    this.service.getPagedList(this.queryInput)
      .subscribe(result => {
        this.users = result.data;
        this.showPaging(result.total);
      })
  }

  addNewUser(): void {
    this.createUserModal.show();
  }

  editUser(user: BUserDto): void {
    this.editUserModal.show(user);
  }

  resetPassowrd(user: BUserDto): void {
    this.resetPasswordModal.show(user.id);
  }

  delete(user: BUserDto) {
    swal({
      title: "是否确认删除当前选择的用户？",
      type: "warning",
      width: "400px",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "否",
      confirmButtonText: "是"
    }).then((willDelete) => {
      if (willDelete.value) {
        this.service.delete(user.id)
          .subscribe(result => {
            this.showDeleteResult(result);
          });
      }
    });
  }

}
