import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseService, PagedInput, BItem } from './base.service';

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

@Injectable()
export class ProjectService extends BaseService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getAlls(queryInput: BProjectQueryInput): Observable<BProjectQueryOutput> {
    let url = this.baseUrl + "/api/project/pagedlist";

    let options_ = {
      headers: this.getHttpHeaders()
    };

    return this.http.post<BProjectQueryOutput>(url, queryInput, options_).pipe(
      tap(item => console.log("get all project")),
      catchError(this.handleError<BProjectQueryOutput>("getAll projects"))
    );
  }

  save(project: BProjectDto): Observable<boolean> {
    let url = this.baseUrl + "/api/project/create";
    if(project.id>0){
      url = this.baseUrl + "/api/project/update";
    }

    let options_ = {
      headers: this.getHttpHeaders()
    };

    return this.http.post<boolean>(url, project, options_).pipe(
      tap(item => console.log("create project")),
      catchError(this.handleError<boolean>("create project"))
    );
  }

  updateMembers(project: BProjectDto): Observable<boolean> {
    let url = this.baseUrl + "/api/project/updatemembers";

    let options_ = {
      headers: this.getHttpHeaders()
    };

    return this.http.post<boolean>(url, project, options_).pipe(
      tap(item => console.log("update project updatemembers")),
      catchError(this.handleError<boolean>("update project updatemembers"))
    );
  }

  addModule(projectModule: BProjectModuleDto): Observable<boolean> {
    let url = this.baseUrl + "/api/project/addmodule";

    let options_ = {
      headers: this.getHttpHeaders()
    };

    return this.http.post<boolean>(url, projectModule, options_).pipe(
      tap(item => console.log("update project addmodule")),
      catchError(this.handleError<boolean>("update project addmodule"))
    );
  }

  removeModule(moduleId: number): Observable<boolean> {
    let url = this.baseUrl + "/api/project/removemodule/" + moduleId;

    let options_ = {
      headers: this.getHttpHeaders()
    };

    return this.http.delete<boolean>(url, options_).pipe(
      tap(item => console.log("update project removemodule")),
      catchError(this.handleError<boolean>("update project removemodule"))
    );
  }

  delete(id: number): Observable<boolean> {
    let url = this.baseUrl + "/api/project/delete/"+ id;

    let options_ = {
      headers: this.getHttpHeaders()
    };

    return this.http.delete<boolean>(url, options_).pipe(
      tap(item => console.log("delete project")),
      catchError(this.handleError<boolean>("delete project"))
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

export class BProjectQueryInput extends PagedInput {
  name: string;
}

export class BProjectQueryOutput {
  total: number;
  data: BProjectDto[];
}

export class BProjectDto {
  id: number;
  name: string;
  desc: string;
  isActive: boolean;
  createUserName: string;
  createTime: Date;
  modules: BItem[];
  members: BItem[];
}

export class BProjectModuleDto{
  id: number;
  projectId:number;
  name: string;
  desc: string;
  createUser: string;
}
