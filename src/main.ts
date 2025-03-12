import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ Import animations provider
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { MessageService } from 'primeng/api';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(), // ✅ Ensure animations are enabled
    MessageService,
  ],
}).catch((err) => console.error(err));
