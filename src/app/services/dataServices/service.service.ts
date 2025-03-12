import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Service, ServiceDefault } from "../../models/Interfaces/Service";
import { SharedVarsService } from "../other/shared-vars.service";
import { AuthService } from "./auth.service";
// saveService
@Injectable({
  providedIn: "root",
})
export class ServiceService {
  http = inject(HttpClient);
  sharedVarService = inject(SharedVarsService);
  baseURL = this.sharedVarService.baseURL;
  token = inject(AuthService).token;
  data:Service = {...ServiceDefault}

  

  get(params: {
    skip?: number;
    limit?: number;
    withCount?: boolean;
    searchValue?: string;
  }): Observable<Service[]> {
    return this.http
      .get<Service[]>(this.baseURL + "/service-client", {
        params : params
      })
      .pipe(
        map((response) => {
          console.log(response , 'response');
          
          return response;
        })
      );
  }
  save(body: Service, id?: string): Observable<void> {
    if (id) {
      return this.http.patch<void>(
        this.baseURL + `/service-client/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      ).pipe(
        tap(() => {
          this.data = { ...ServiceDefault };
        })
      );
    }
    return this.http.post<void>(this.baseURL + "/service-client", body, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).pipe(
      tap(() => {
        this.data = { ...ServiceDefault };
        this.data.name = {}
      })
    );
  }
  delete(serviceId: string): Observable<void> {
    return this.http.delete<void>(
      this.baseURL + `/service-client/${serviceId}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
}
  