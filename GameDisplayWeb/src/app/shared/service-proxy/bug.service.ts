import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { AppConsts } from '../AppConsts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class BugService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.http = http;
    this.baseUrl = AppConsts.appBaseUrl;
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

    return this.http.get<UserLoginInfoDto>(url).pipe(
      tap(item => console.log("get getCurrentLoginInformations")),
      catchError(this.handleError<UserLoginInfoDto>("getCurrentLoginInformationsr"))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
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

