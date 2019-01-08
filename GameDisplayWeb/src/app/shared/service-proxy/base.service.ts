import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConsts } from '../AppConsts';


export class BaseService {

    protected baseUrl: string;


    constructor(protected http: HttpClient) {
        this.http = http;
        this.baseUrl = AppConsts.appBaseUrl;
    }

    protected getHttpHeaders(): HttpHeaders {

        let headers: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "token " + this.getCookie("auth_token")
        })

        return headers;
    }

    private getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        }
        else {
            return null;
        }
    }

    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}

export class PagedInput {
    page: number;
    pageSize: number;

    constructor() {
        this.page = 1;
        this.pageSize = 10;
    }
}

export class BItem {
    id: number;
    name: string;
    desc: string;
}

export class TreeItem {
    id: number;
    name: string;
    isSelected: boolean = false;
    children: TreeItem[];
}