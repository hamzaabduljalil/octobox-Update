import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  // apiKey = "L5v3INkYIJimInONceA9XaX3N";
  // appId = "frUS8kzrfUx90EoeLJYsZknl0";
  // sessionToken = "r:1f57895b6c0e20ddcd8528a9c5caa393"
  apiKey = 'qTjfpmQsqILMtediTBgF';
  appId = 'CNprJXqnoJUPvVlefoll';
  // sessionToken = "r:75a8abd4963b4816ceebd654d119ce9f"
  private isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private toastService: ToastService,
    private router: Router,
    private dialogService: DialogService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const setHeaders: any = {
      'X-Parse-REST-API-Key': this.apiKey,
      'X-Parse-Application-Id': this.appId,
      // "X-Parse-Session-Token" : this.sessionToken
    };

    // if (
    //   localStorage.getItem("sessionToken") &&
    //   !req.url.includes("/api/functions/login")
    // ) {
    //   setHeaders["X-Parse-Session-Token"] =
    //     localStorage.getItem("sessionToken");
    // }

    const clonedRequest = req.clone({
      setHeaders,
    });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.error, error);

        const isCustomerFormError =
          error.status === 400 && this.router.url === '/customer/form';
        if (!isCustomerFormError) {
          this.toastService.showToast(
            'error',
            '',
            error.error?.message ||
              error.statusText ||
              'An unexpected error occurred.'
          );
        }

        if ([142, 209].indexOf(error?.error?.code)) {
          console.log(this.dialogService.dialogComponentRefMap);
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
