import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { TreeItem, BItem } from '../../../shared/service-proxy/base.service'
import { ProjectService, UserService, BProjectDto } from '../../../shared/service-proxy/bug.service'
import { AppComponentBase } from '../../../shared/app-component-base';

@Component({
  selector: 'app-add-member-project',
  templateUrl: './add-member-project.component.html',
  styleUrls: ['./add-member-project.component.css']
})
export class AddMemberProjectComponent extends AppComponentBase implements OnInit {

  @ViewChild('addMemberProjectModal') modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  saving: boolean = false;
  project: BProjectDto = new BProjectDto();
  treeUsers: TreeItem[];

  constructor(private service: ProjectService,
    private userService: UserService,
    public toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit() {
    this.userService.getRoleTree()
      .subscribe(items => {
        //将已有成员设置为已选择
        this.treeUsers = items;
        this.setUserSelect();
      });
  }

  setUserSelect(): void {
    this.treeUsers.forEach(item => {
      item.children.forEach(user => {
        user.isSelected = false;
        for (let i = 0; i < this.project.members.length; i++) {
          if (this.project.members[i].id == user.id) {
            user.isSelected = true;
          }
        }
      });
    });
  }

  save(): void {
    this.project.members = [];
    this.treeUsers.forEach(item => {
      item.children.forEach(user => {
        if (user.isSelected) {
          let member = new BItem();
          member.id = user.id;
          member.name = user.name;
          this.project.members.push(member);
        }
      })
    });

    console.log(this.project.members);

    this.saving = true;
    this.service.updateMembers(this.project)
      .pipe(finalize(() => { this.saving = false; }))
      .subscribe(() => {
        this.notify("success", "提示", "保存成功！")
        this.close();
        this.modalSave.emit(null);
      });
  }


  show(project: BProjectDto): void {
    this.project = project;
    this.setUserSelect();
    this.modal.show();
  }

  close(): void {
    this.modal.hide();
  }


}
