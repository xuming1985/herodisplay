import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { AppConsts } from '../AppConsts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EquipmentService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.http = http;
    this.baseUrl = AppConsts.appBaseUrl;
  }

  getAll(): Observable<Equipment[]> {
    let url = this.baseUrl + "/api/Equipment";

    return this.http.get<Equipment[]>(url).pipe(
      tap(summoners => console.log("get all summoner")),
      catchError(this.handleError<Equipment[]>("getAll Summoner", []))
    );

  }

  getAllCategory():EquipmentCategory[]{
    const categories :EquipmentCategory[]  = [
      { id: 0, name: '全部' },
      { id: 1, name: '攻击' },
      { id: 2, name: '法术' },
      { id: 3, name: '防御' },
      { id: 4, name: '移动' },
      { id: 5, name: '打野' },
      { id: 7, name: '辅助' }
    ];
    return categories;
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

export class Equipment {
  Id: number;
  Category: number;
  Name: string;
  Thumbnail: string;
  BuyPrice: number;
  SellPrice: number;
  Desc1: string;
  Desc2: string;
}

export class EquipmentCategory {
  id: number;
  name: string;
}
