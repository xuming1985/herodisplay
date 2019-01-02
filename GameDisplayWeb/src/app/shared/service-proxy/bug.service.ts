import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable()
export class BugService extends BaseService{

  constructor(protected http: HttpClient) {
    super(http);
  }

  getAll(): Observable<BUserDto[]> {
    let url = this.baseUrl + "/api/StockMonitor";

    return this.http.get<BUserDto[]>(url).pipe(
      tap(summoners => console.log("get all summoner")),
      catchError(this.handleError<BUserDto[]>("getAll StockMonitor", []))
    );
  }

  getCurrentLoginInformations(): Observable<UserLoginInfoDto> {
    let url = this.baseUrl + "/api/login/GetCurrentLoginInformations";

    let options_ = {
      headers: this.getHttpHeaders()
    };

    return this.http.get<UserLoginInfoDto>(url, options_).pipe(
      tap(item => console.log("get getCurrentLoginInformations")),
      catchError(this.handleError<UserLoginInfoDto>("getCurrentLoginInformationsr"))
    );
  }



}

export class UserLoginInfoDto {
  id: number;
  account: string;
  roles: number[];
  isAdmin: boolean;
}

export class BUserDto {
  id: number;
  name: string;
}

