import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

import { PagedInput, BItem } from '../../shared/service-proxy/base.service'
import { ProjectService, BProjectQueryInput, BProjectDto } from '../../shared/service-proxy/bug.service'
import { PagedListingComponentBase } from '../../shared/pagination/paged-listing-component-base';

import { EditProjectComponent } from './edit-project/edit-project.component';
import { AddMemberProjectComponent } from './add-member-project/add-member-project.component';
import { AddModuleProjectComponent } from './add-module-project/add-module-project.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent extends PagedListingComponentBase {

  private projects: BProjectDto[] = [];
  private queryInput: BProjectQueryInput = new BProjectQueryInput();

  @ViewChild('editProjectModal') editProjectModal: EditProjectComponent;
  @ViewChild('addMemberProjectModal') addMemberProjectModal: AddMemberProjectComponent;
  @ViewChild('addModuleProjectModal') addModuleProjectModal: AddModuleProjectComponent;

  constructor(
    private service: ProjectService,
    public toastr: ToastrService) {
    super(toastr);
  }

  onPageChanged(pageInfo: PagedInput): void {
    this.queryInput.page = pageInfo.page;
    this.queryInput.pageSize = pageInfo.pageSize;
    this.service.getAlls(this.queryInput)
      .subscribe(result => {
        this.projects = result.data;
        this.showPaging(result.total);
      })
  }

  addNewProject(): void {
    this.editProjectModal.show(null);
  }

  editProject(project: BProjectDto): void {
    this.editProjectModal.show(project);
  }

  addModule(project: BProjectDto): void {
    this.addModuleProjectModal.show(project.id);
  }

  removeModule(module: BItem): void {

    swal({
      title: "是否确认删除当前选择得项目模块？",
      type: "warning",
      width: "400px",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "否",
      confirmButtonText: "是"
    }).then((willDelete) => {
      if (willDelete.value) {
        this.service.removeModule(module.id)
          .subscribe(result => {
            this.showDeleteResult(result);
          });
      }
    });
  }

  addMember(project: BProjectDto): void {
    this.addMemberProjectModal.show(project);
  }

  removeMember(member: BItem): void {
    swal({
      title: "是否确认删除当前选择的项目成员？",
      type: "warning",
      width: "400px",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "否",
      confirmButtonText: "是"
    }).then((willDelete) => {
      if (willDelete.value) {
        this.service.removeMember(member.id)
          .subscribe(result => {
            this.showDeleteResult(result);
          });
      }
    });
  }

  delete(project: BProjectDto) {
    swal({
      title: "是否确认删除当前选择的项目？",
      type: "warning",
      width: "400px",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "否",
      confirmButtonText: "是"
    }).then((willDelete) => {
      if (willDelete.value) {
        this.service.delete(project.id)
          .subscribe(result => {
            this.showDeleteResult(result);
          });
      }
    });
  }

}
