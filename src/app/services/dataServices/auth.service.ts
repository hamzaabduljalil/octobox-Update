import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SharedVarsService } from '../other/shared-vars.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storage: Storage | undefined;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage = localStorage;
    }
    // this.token = this.storage?.getItem('access_token') || '';
  }
  setItem(key: string, value: string) {
    if (this.storage) {
      this.storage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    return this.storage?.getItem(key) || null;
  }
  getLocal(): string | null {
    return this.storage?.getItem('access_token') || null;
  }
  http = inject(HttpClient);
  sharedService = inject(SharedVarsService);
  router = inject(Router);
  baseUrl = this.sharedService.baseURL;
  token = this.getLocal();

  login(username: string, password: string): Observable<any> {
    console.log('username', username);
    console.log('password', password);
    //  this.http
    //   .post(this.baseUrl + "/user/login", { username, password })
    //   .pipe(
    //     map((response: any) => {
    //       console.log(response.access_token, "response");
    //       localStorage.setItem("access_token", response.access_token);
    //       this.token = localStorage.getItem("access_token") || "";
    //       console.log(this.token, "token");
    //       return response;
    //     })
    //   );
    return this.http.post(this.baseUrl + '/user/login', { username, password });
  }
}
