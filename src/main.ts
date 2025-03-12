import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { MessageService } from 'primeng/api'; // ✅ Import MessageService

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    MessageService, // ✅ Provide MessageService globally
  ],
}).catch((err) => console.error(err));
