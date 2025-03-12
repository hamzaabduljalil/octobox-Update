import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { City } from '../../models/Interfaces/City';
import { SharedVarsService } from '../other/shared-vars.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  http = inject(HttpClient);
  sharedVarService = inject(SharedVarsService);
  baseURL = this.sharedVarService.baseURL;
  token = inject(AuthService).token;

  get(params:{
    skip?:number,
    limit?:number,
    withCount?:boolean,
    searchValue?:string,
    sortKey?:string,
    sortOrder?:number
  }): Observable<City[]> {
    return this.http.get<City[]>(this.baseURL + "/city" , {
      params:params
    }).pipe(
          map((response) => {
            return response
          })
        )
  };
  save(body: City , id?: string): Observable<void> {
    if(id){
      return this.http.patch<void>(this.baseURL + `/city/${id}`, body , {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      
    }
    return this.http.post<void>(this.baseURL + "/city", body,
      {
        headers:{
          'Authorization': `Bearer ${this.token}`
        }
      }
    );

  };

  delete(cityId: string): Observable<void> {
    return this.http.delete<void>(this.baseURL + `/city/${cityId}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }
}
