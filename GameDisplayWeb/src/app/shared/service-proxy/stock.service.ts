import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { AppConsts } from '../AppConsts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class StockService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.http = http;
    this.baseUrl = AppConsts.appBaseUrl;
  }

  getAll(): Observable<StockMonitor[]> {
    let url = this.baseUrl + "/api/StockMonitor";

    return this.http.get<StockMonitor[]>(url).pipe(
      tap(summoners => console.log("get all summoner")),
      catchError(this.handleError<StockMonitor[]>("getAll StockMonitor", []))
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

export class StockMonitor {
  id: number;
  name: string;
  code: string;
  category: string;
  index: number;
  currentPrice: number;
  floatingPrice: number;
  floatingRate: number;
}