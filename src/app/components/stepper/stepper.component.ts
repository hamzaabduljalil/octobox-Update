import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { MainFormComponent } from '../main-form/main-form.component';
@Component({
  selector: 'app-stepper',
  imports: [ButtonModule, StepperModule, MainFormComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
})
export class StepperComponent {}
