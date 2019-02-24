import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '../../shared/app-component-base';
import { UserService, PasswordResetDto, UserForEditDto } from '../../shared/service-proxy/bug.service'
import { AppSessionService } from '../../shared/auth/app-session.service'

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent extends AppComponentBase implements OnInit {

  user: UserForEditDto;
  password: PasswordResetDto = new PasswordResetDto();

  constructor(
    private service: UserService,
    private appSessionService: AppSessionService,
    public toastr: ToastrService) {
      super(toastr);
  }

  ngOnInit() {
    this.user = new UserForEditDto(this.appSessionService.user);
  }


  updateUserInfo(): void {

    this.saving = true;
    this.service.update(this.user)
      .pipe(finalize(() => { this.saving = false; }))
      .subscribe(() => {
        this.notify("success", "提示", "修改成功！")
      });
  }
}
