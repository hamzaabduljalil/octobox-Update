import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { InputSelectorComponent } from '../input-selector/input-selector.component';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-shipping-form',
  imports: [
    InputFieldComponent,
    InputSelectorComponent,
    RadioGroupComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.css',
})
export class ShippingFormComponent {
  @Input() title!: string;
  @Input() form!: FormGroup;
  @Input() selectedType: string = '';

  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
  selectType(type: string): void {
    this.selectedType = type;
  }
  selectedAddress: string = 'residential';
}
