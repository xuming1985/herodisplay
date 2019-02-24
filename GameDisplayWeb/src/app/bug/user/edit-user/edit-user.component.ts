import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '../../../shared/app-component-base';
import { BItem } from '../../../shared/service-proxy/base.service'
import { UserService, BUserDto, UserForEditDto } from '../../../shared/service-proxy/bug.service'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent extends AppComponentBase implements OnInit {

  @ViewChild('editUserModal') modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  model: UserForEditDto = null;
  roles: BItem[] = [];

  constructor(private service: UserService,
    public toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit() {
    this.service.getRoles()
      .subscribe(items => {
        this.roles = items;
      });
  }

  save(): void {

    this.saving = true;
    this.service.update(this.model)
      .pipe(finalize(() => { this.saving = false; }))
      .subscribe(() => {
        this.notify("success", "提示", "保存成功！")
        this.close();
        this.modalSave.emit(null);
      });
  }

  show(user: BUserDto): void {
    this.model = new UserForEditDto(user);
    this.modal.show();
  }

  close(): void {
    this.modal.hide();
  }


}
