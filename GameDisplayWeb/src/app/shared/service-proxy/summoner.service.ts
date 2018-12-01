import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap,tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { AppConsts } from '../AppConsts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SummonerService {

  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(private http: HttpClient) {
    this.http = http;
    this.baseUrl = AppConsts.appBaseUrl;
  }

  getAll(): Observable<Summoner[]> {
    let url = this.baseUrl + "/api/SummonerSkill";

    return this.http.get<Summoner[]>(url).pipe(
      tap(summoners=> console.log("get all summoner")),
      catchError(this.handleError<Summoner[]>("getAll Summoner", []))
    );

}



private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}

export class Summoner {
  Id: number;
  SkillName: string;
  Thumbnail: string;
  DisplayImage: string;
  Condition: string;
  Description: string;

  init(data?: any) {
    if (data) {
      this.Id = data["Id"];
      this.SkillName = data["SkillName"];
      this.Thumbnail = data["Thumbnail"];
      this.DisplayImage = data["DisplayImage"];
      this.Condition = data["Condition"];
      this.Description = data["Description"];
    }
  }
}
