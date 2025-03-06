import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainFormComponent } from './components/main-form/main-form.component';
import { RatesFormComponent } from './components/rates-form/rates-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainFormComponent, RatesFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-project';
}
