import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainFormComponent } from './components/main-form/main-form.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainFormComponent, ShippingFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-project';
}
