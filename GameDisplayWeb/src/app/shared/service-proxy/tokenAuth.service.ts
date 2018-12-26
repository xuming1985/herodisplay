import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { AppConsts } from '../AppConsts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class TokenAuthService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.http = http;
    this.baseUrl = AppConsts.appBaseUrl;
  }

  authenticate(authenticateModel:AuthenticateModel): Observable<string> {
    let url = this.baseUrl + "/api/login";

    return this.http.post<string>(url, authenticateModel).pipe(
      tap(item => console.log("authenticate user")),
      catchError(this.handleError<string>("authenticate user"))
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

export class AuthenticateModel {
  account: string;
  password: string;
  clientID: string;
}
