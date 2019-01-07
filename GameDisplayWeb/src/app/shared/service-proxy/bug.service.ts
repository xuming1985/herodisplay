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

  create(user: BUserDto): Observable<boolean> {
    let url = this.baseUrl + "/api/user/create";

    let options_ = {
      headers: this.getHttpHeaders()
    };

    return this.http.post<boolean>(url, user, options_).pipe(
      tap(item => console.log("create user")),
      catchError(this.handleError<boolean>("create user"))
    );
  }

  getUserForEdit(id: number): Observable<UserForEditDto> {
    let url = this.baseUrl + "/api/user/getUserForEdit/" + id;

    let options_ = {
      headers: this.getHttpHeaders()
    };

    return this.http.get<UserForEditDto>(url, options_).pipe(
      tap(item => console.log("edit user")),
      catchError(this.handleError<UserForEditDto>("edit user"))
    );
  }

  update(model: UserForEditDto): Observable<boolean> {
    let url = this.baseUrl + "/api/user/create";

    let options_ = {
      headers: this.getHttpHeaders()
    };

    return this.http.post<boolean>(url, model, options_).pipe(
      tap(item => console.log("update user")),
      catchError(this.handleError<boolean>("update user"))
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

export class UserForEditDto {
  user: BUserDto | undefined;
}

