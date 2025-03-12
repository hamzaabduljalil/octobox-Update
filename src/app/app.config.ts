import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {
  provideRouter,
  withHashLocation,
  withViewTransitions,
} from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
// import { ToastService } from './services/other/toast.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ToastService } from './services/other/toast.service';
import { MyPreset } from './MyPreset';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideRouter(routes, withHashLocation(), withViewTransitions()),
    provideAnimationsAsync(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   // useClass: HttpInterceptorService,
    //   multi: true,
    // },
    MessageService,
    ToastService,
    DialogService,
    ConfirmationService,
    DynamicDialogRef,
    DynamicDialogConfig,
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
  ],
};
