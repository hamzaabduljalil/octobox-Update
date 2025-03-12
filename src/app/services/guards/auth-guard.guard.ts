// import { CanActivateFn } from "@angular/router";

// export const authGuardGuard: CanActivateFn = (route, state) => {

//   const token = localStorage.getItem("access_token");
//   if (!token) {
//     return false;
//   }
//   return true;
// };
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  canActivate() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      if (!token) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    return false;
  }
}
