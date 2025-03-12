import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

import {
  provideRouter,
  withHashLocation,
  withViewTransitions,
} from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ToastService } from './services/other/toast.service';
import aura from '@primeng/themes/aura';
import { definePreset } from '@primeng/themes';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideRouter(routes, withHashLocation(), withViewTransitions()),
    provideAnimations(),
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
    //   useClass: HttpInterceptorService,
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
        preset: definePreset(aura, {
          semantic: {
            root: {},
            colorScheme: {
              light: {
                root: {
                  '-tooltip-background': '#f9f9fb',
                  '-tooltip-color': '#001533',
                  '-surface-e': '#ffffff',
                  '-text-color': '#001533',
                  '-multiselect-background': '',
                  '-multiselect-border-color': '',
                },
              },
              dark: {
                root: {
                  '-tooltip-background': '#363c43',
                  '-tooltip-color': '#fff',
                  '-surface-e': '#2a323d',
                  '-text-color': '#fff',
                  '-multiselect-background': '',
                  '-multiselect-border-color': '',
                },
              },
            },
          },
        }),
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
  ],
};
