import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { SharedVarsService } from "../other/shared-vars.service";
import { map } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  http = inject(HttpClient);
  sharedService = inject(SharedVarsService);
  router = inject(Router);
  baseUrl = this.sharedService.baseURL;
  token = localStorage.getItem("access_token") || "";

  login(username: string, password: string) {
    console.log("username", username);
    console.log("password", password);
    return this.http
      .post(this.baseUrl + "/user/login", { username, password })
      .pipe(
        map((response: any) => {
          console.log(response.access_token, "response");
          localStorage.setItem("access_token", response.access_token);
          this.token = localStorage.getItem("access_token") || "";
          console.log(this.token, "token");
          return response;
        })
      );
  }
}
