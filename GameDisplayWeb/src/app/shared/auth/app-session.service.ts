import { Injectable } from '@angular/core';
import { BugService, UserLoginInfoDto } from '../service-proxy/bug.service'

@Injectable({
  providedIn: 'root',
})
export class AppSessionService {

  private _user: UserLoginInfoDto;

  constructor(private _bugService: BugService) {
    this._bugService.getCurrentLoginInformations().subscribe(result=>{
      this._user = result;
    });
  }

  get user(): UserLoginInfoDto {
    console.log("user:" + this._user);
    return this._user;
  }

  init(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        this._bugService.getCurrentLoginInformations().toPromise().then((result: UserLoginInfoDto) => {
            this._user = result;         
            resolve(true);
        }, (err) => {
            reject(err);
        });
    });
}
}
