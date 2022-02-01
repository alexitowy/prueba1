import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeyPath } from '../models/keypath.model';
/**
 * this class is service for Github API
 * @class GithubService
 */
@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private readonly http: HttpClient) { }

  /**
   * @description this method get search from github with params
   * @param data {Record}
   * @returns Observable<any>
   */
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
