import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '../../../shared/app-component-base';
import { BItem } from '../../../shared/service-proxy/base.service'
import { UserService, BUserDto } from '../../../shared/service-proxy/bug.service'

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent extends AppComponentBase implements OnInit {

  @ViewChild('createUserModal') modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  saving: boolean = false;
  user: BUserDto = null;
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
    this.service.create(this.user)
      .pipe(finalize(() => { this.saving = false; }))
      .subscribe(() => {
        this.notify("success", "提示", "保存成功！")
        this.close();
        this.modalSave.emit(null);
      });
  }

  show(): void {
    this.user = new BUserDto();
    this.modal.show();
  }

  close(): void {
    this.modal.hide();
  }

}
