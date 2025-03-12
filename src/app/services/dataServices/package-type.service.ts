import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { SharedVarsService } from "../other/shared-vars.service";
import { PackageType } from "../../models/Interfaces/PackageType";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class PackageTypeService {
  http = inject(HttpClient);
  sharedVarService = inject(SharedVarsService);
  baseURL = this.sharedVarService.baseURL;
  token = inject(AuthService).token

  get(params:{
    skip?:number,
    limit?:number,
    withCount?:boolean,
    searchValue?:string,
    sortKey?:string,
    sortOrder?:number
  }): Observable<PackageType[]> {
    return this.http
      .get<PackageType[]>(this.baseURL + "/package-type" , {
        params: params
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(
      this.baseURL + `/package-type/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  save(body: PackageType , id?:string): Observable<void> {
    if(id){
      return this.http.patch<void>(
        this.baseURL + "/package-type/" + id,
        body,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
    }
    return this.http.post<void>(
      this.baseURL + "/package-type",
      body,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
}
