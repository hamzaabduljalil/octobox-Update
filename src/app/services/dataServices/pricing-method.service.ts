import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { PricingMethod } from "../../models/Interfaces/PricingMethod";
import { SharedVarsService } from "../other/shared-vars.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class PricingMethodService {
  http = inject(HttpClient);
  sharedVarService = inject(SharedVarsService);
  baseURL = this.sharedVarService.baseURL;
  token = inject(AuthService).token
  get(params:{
    skip?:number,
    limit?:number,
    withCount?:boolean,
    searchValue?:string
  }): Observable<PricingMethod[]> {
    return this.http
      .get<PricingMethod[]>(this.baseURL + "/pricing-method" , {
        params:params
      })
      .pipe(
        map((response) => {
          console.log(response , 'response');
          
          return response;
        })
      );
  }
  save(body: PricingMethod, id?:string): Observable<void> {
    if(id){
      return this.http.patch<void>(
        this.baseURL + `/pricing-method/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
    }
    return this.http.post<void>(
      this.baseURL + "/pricing-method",
      body,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  deletePricingMethod(id: string): Observable<void> {
    return this.http.delete<void>(
      this.baseURL + `/pricing-method/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
}
