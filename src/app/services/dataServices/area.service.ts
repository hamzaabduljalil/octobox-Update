import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Area } from '../../models/Interfaces/Area';
import { City } from '../../models/Interfaces/City';
import { SharedVarsService } from '../other/shared-vars.service';
import { CityArea } from '../../models/Interfaces/CityArea';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  http = inject(HttpClient);
  sharedVarService = inject(SharedVarsService);
  baseURL = this.sharedVarService.baseURL;
  token = inject(AuthService).token

  get(params:{
    skip?:number,
    limit?:number,
    withCount?:boolean,
    searchValue?:string
  }): Observable<Area[]> {
    return this.http.get<Area[]>(this.baseURL + "/area" , {
      params:params
    }).pipe(
      map((response) => {
        return response
      })
    );
  };
  save(body: Area , id?:string): Observable<void> {
    if(id){
      return this.http.patch<void>(this.baseURL + `/area/${id}`,body , {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
    }
    return this.http.post<void>(this.baseURL + "/area",body , {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  };
  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseURL + `/area/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  };





  
  getAreasByCities(body: string[]): Observable<CityArea[]> {
    return this.http.post<CityArea[]>(this.baseURL + "/area/cities", body);
  }
}
