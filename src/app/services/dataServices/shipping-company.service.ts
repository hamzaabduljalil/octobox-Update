import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Company } from "../../models/Interfaces/Company";
import { SharedVarsService } from "../other/shared-vars.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class ShippingCompanyService {
  http = inject(HttpClient);
  sharedVarService = inject(SharedVarsService);
  baseURL = this.sharedVarService.baseURL;
  token = inject(AuthService).token;

  get(params: {
    skip?: number;
    limit?: number;
    withCount?: boolean;
    searchValue?: string;
    sortkey?:string;
    sortOrder?:number

  }): Observable<Company[]> {
    return this.http
      .get<Company[]>(this.baseURL + "/shipping-company", {
        params: params,
      })
      .pipe(
        map((response) => {
          console.log(response, "companies");
          return response;
        })
      );
  }
  save(body: Company, id?: string): Observable<void> {
    console.log(body, "body");
    if (id) {
      return this.http.patch<void>(
        this.baseURL + `/shipping-company/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
    }
    return this.http.post<void>(this.baseURL + "/shipping-company", body, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseURL + `/shipping-company/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
}
