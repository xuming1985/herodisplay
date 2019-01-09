import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '../../../shared/app-component-base';
import { UserService, PasswordResetDto } from '../../../shared/service-proxy/bug.service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent extends AppComponentBase implements OnInit {

  @ViewChild('resetPasswordModal') modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  saving: boolean = false;
  model: PasswordResetDto = null;

  constructor(private service: UserService,
    public toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit() {
  }

  save(): void {

    this.saving = true;
    this.service.resetPassword(this.model)
      .pipe(finalize(() => { this.saving = false; }))
      .subscribe((result) => {
        if (result.success) {
          this.notify("success", "提示", "保存成功！");
          this.close();
          this.modalSave.emit(null);
        } else {
          this.notify("error", "提示", result.message);
        }
      });
  }

  show(id: number): void {

    this.model = new PasswordResetDto();
    this.model.userId = id;
    this.modal.show();
  }

  close(): void {
    this.modal.hide();
  }
}
