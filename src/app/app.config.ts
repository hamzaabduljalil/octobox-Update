import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: {
          semantic: {
            colorScheme: {
              light: {
                surface: {
                  0: '#ffffff',
                  50: '#f8fafc', // Zinc 50
                  100: '#f1f5f9', // Zinc 100
                  200: '#e2e8f0', // Zinc 200
                  300: '#cbd5e1', // Zinc 300
                  400: '#94a3b8', // Zinc 400
                  500: '#64748b', // Zinc 500
                  600: '#475569', // Zinc 600
                  700: '#334155', // Zinc 700
                  800: '#1e293b', // Zinc 800
                  900: '#0f172a', // Zinc 900
                  950: '#020617', // Zinc 950
                },
              },
              dark: {
                surface: {
                  0: '#ffffff',
                  50: '#f8fafc', // Slate 50
                  100: '#f1f5f9', // Slate 100
                  200: '#e2e8f0', // Slate 200
                  300: '#cbd5e1', // Slate 300
                  400: '#94a3b8', // Slate 400
                  500: '#64748b', // Slate 500
                  600: '#475569', // Slate 600
                  700: '#334155', // Slate 700
                  800: '#1e293b', // Slate 800
                  900: '#0f172a', // Slate 900
                  950: '#020617', // Slate 950
                },
              },
            },
          },
        },
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
  ],
};
