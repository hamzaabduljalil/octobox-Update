import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { SharedVarsService } from "../other/shared-vars.service";
import { Vehicle } from "../../models/Interfaces/Vehicle";
import { AuthService } from "./auth.service";
@Injectable({
  providedIn: "root",
})
export class VehicleTypeService {
  http = inject(HttpClient);
  sharedVarService = inject(SharedVarsService);
  baseURL = this.sharedVarService.baseURL;
  token = inject(AuthService).token;

  get(params: {
    skip?: number;
    limit?: number;
    withCount?: boolean;
    searchValue?: string;
    sortKey?:string;
    sortOrder?:number
  }): Observable<Vehicle[]> {
    return this.http
      .get<Vehicle[]>(this.baseURL + "/vehicle", {
        params,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  save(body: Vehicle, id?: string): Observable<void> {
    if (id) {
      return this.http.patch<void>(this.baseURL + `/vehicle/${id}`, body, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    }
    return this.http.post<void>(this.baseURL + "/vehicle", body, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseURL + `/vehicle/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
