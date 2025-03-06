import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormArray,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ShippingFormComponent } from '../shipping-form/shipping-form.component';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { SecondFormComponent } from '../second-form/second-form.component';
import { RatesFormComponent } from '../rates-form/rates-form.component';
import { InfoFormComponent } from '../info-form/info-form.component';
import { ChoosePackageComponent } from '../choose-package/choose-package.component';

@Component({
  selector: 'app-main-form',
  standalone: true,
  imports: [
    CommonModule, // ✅ FIXED: Use CommonModule instead of BrowserModule
    ShippingFormComponent,
    ReactiveFormsModule,
    ButtonModule,
    StepperModule,
    SecondFormComponent,
    RatesFormComponent,
    InfoFormComponent,
    ChoosePackageComponent,
  ],
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
})
export class MainFormComponent {
  mainForm: FormGroup;
  selectedCard: any = null;
  selectedPlan: any = null;

  constructor() {
    this.mainForm = new FormGroup({
      shippingFrom: new FormGroup({
        country: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        floor: new FormControl('', Validators.required),
        address: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        contactName: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', [
          Validators.pattern(/^\+?[0-9]{10,15}$/),
        ]),
        addressType: new FormControl('home', Validators.required),
      }),
      shippingTo: new FormGroup({
        country: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        floor: new FormControl('', Validators.required),
        address: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        contactName: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', [
          Validators.pattern(/^\+?[0-9]{10,15}$/),
        ]),
        addressType: new FormControl('home', Validators.required),
      }),
      secondForm: new FormGroup({
        length: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
        width: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
        height: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
        weight: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
        quantity: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
        description: new FormControl(''),
        items: new FormArray([]),
      }),
    });
  }

  get shippingFromForm(): FormGroup {
    return this.mainForm.get('shippingFrom') as FormGroup;
  }

  get shippingToForm(): FormGroup {
    return this.mainForm.get('shippingTo') as FormGroup;
  }

  get secondForm(): FormGroup {
    return this.mainForm.get('secondForm') as FormGroup;
  }

  swapForms() {
    const fromData = this.shippingFromForm.value;
    this.mainForm.patchValue({
      shippingFrom: this.shippingToForm.value,
      shippingTo: fromData,
    });
  }

  onCardSelected(card: any) {
    this.selectedCard = card;
    console.log('Card selected in main form:', this.selectedCard);
  }
  handlePlanSelection(plan: any) {
    this.selectedPlan = plan;
    console.log('Plan selected in main form:', this.selectedPlan);
  }
  currentStep = 1;

  types = ['Pallet', 'Package', 'Courier-Pak', 'Envelope'];
  selectedType: string = 'Package'; // Default selection

  selectType(type: string): void {
    this.selectedType = type;
  }

  // packageTypes = ['Pallet', 'Package', 'Courier-Pak', 'Envelope'];
  // selectedPackage = 'Standard';

  // onPackageSelected(type: string) {
  //   this.selectedPackage = type;
  // }
}
