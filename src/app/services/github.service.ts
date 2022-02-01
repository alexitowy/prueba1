import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeyPath } from '../models/keypath.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private readonly http: HttpClient) { }

  search(data: any): Observable<any> {
    let params = new HttpParams();
    Object.entries(data).forEach(([key, value]) => {
      if(value){
        params = params.append(key, value as any)
      }
    })
    return this.http.get<Observable<any>>(`${environment.apiUrl}${KeyPath.SEARCH}`, {params});
  }
}
