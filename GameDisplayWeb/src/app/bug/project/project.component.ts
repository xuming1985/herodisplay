import { Component, OnInit, ViewChild } from '@angular/core';
import { PagedInput } from '../../shared/service-proxy/base.service'
import { ProjectService, BProjectQueryInput, BProjectDto, BProjectModuleDto } from '../../shared/service-proxy/bug.service'
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

  constructor(private service: ProjectService) {
    super()
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

  addModule(project:BProjectDto):void{
    this.addModuleProjectModal.show(project.id);
  }

  removeModule(module: BProjectModuleDto):void{
    console.log("delete module "+ module.name);
  }

  addMember(project:BProjectDto):void{
    
  }

  delete(user: BProjectDto) {

  }

}
