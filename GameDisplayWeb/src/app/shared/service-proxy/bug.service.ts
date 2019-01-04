import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseService, PagedInput } from './base.service';

@Injectable()
export class BugService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http);
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

@Injectable()
export class UserService extends BaseService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getAllUsers(queryInput: BUserQueryInput): Observable<BUserQueryOutput> {
    let url = this.baseUrl + "/api/user/pagedlist";

    let options_ = {
      headers: this.getHttpHeaders()
    };

    return this.http.post<BUserQueryOutput>(url, queryInput, options_).pipe(
      tap(item => console.log("get all users")),
      catchError(this.handleError<BUserQueryOutput>("getAll users"))
    );
  }
}

export class UserLoginInfoDto {
  id: number;
  account: string;
  roles: number[];
  isAdmin: boolean;
}



export class BUserQueryInput extends PagedInput {

}

export class BUserQueryOutput {
  total: number;
  data: BUserDto[];
}

export class BUserDto {
  id: number;
  account: string;
  password: string;
  realName: string;
  email: string;
  telephone: string;
  role: string;
  createUser: string;
  createTime: Date;
}

