import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BugService, UserLoginInfoDto, BUserDto } from '../service-proxy/bug.service'

@Injectable({
  providedIn: 'root',
})
export class AppSessionService {

  private _user: BUserDto;
  private _lognInfo: UserLoginInfoDto;

  constructor(private _bugService: BugService,
    private _router: Router,) {
    this._bugService.getCurrentLoginInformations().subscribe(result=>{
      this._lognInfo = result;
    });
  }

  get user(): BUserDto {
    console.log("_user:" + this._user);
    return this._user;
  }

  init(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        this._bugService.getCurrentLoginInformations().toPromise().then((result: UserLoginInfoDto) => {
            this._lognInfo = result; 
            this._user = result.user;    
            console.log(this._router.url);    
            resolve(true);
        }, (err) => {
            reject(err);
        });
    });
}
}
