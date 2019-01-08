import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenAuthService, AuthenticateModel } from '../../shared/service-proxy/tokenAuth.service'
import { AppSessionService } from '../../shared/auth/app-session.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticateModel: AuthenticateModel = new AuthenticateModel();

  constructor(
    private _tokenAuthService: TokenAuthService,
    private _sessionService: AppSessionService,
    private _router: Router,
  ) { }

  ngOnInit() {

  }

  authenticate(): void {

    this._tokenAuthService
      .authenticate(this.authenticateModel)
      .subscribe((result: string) => {
        if (result) {
          this.setCookie("auth_token", result);
          this._sessionService.init().then(() => {
            this._router.navigate(['bug', 'list'])
          })
        }
      });
  }

  setCookie(name, value): void {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toDateString();
  }


  private clear(): void {
    this.authenticateModel = new AuthenticateModel();
  }
}
