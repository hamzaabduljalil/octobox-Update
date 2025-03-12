import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import {
  FormGroup,
  FormControl,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightFormComponent } from '../../components/weight-form/weight-form.component';
import { RatesFormComponent } from '../../components/rates-form/rates-form.component';
import { InfoFormComponent } from '../../components/info-form/info-form.component';
import { ChoosePackageComponent } from '../../components/choose-package/choose-package.component';
import { SaveAddressesComponent } from '../../components/dialogs/save-addresses/save-addresses.component';
import { SaveRadioComponent } from '../../components/dialogs/save-radio/save-radio.component';
import { ShippingFormComponent } from '../../components/shipping-form/shipping-form.component';
// import { ToastService } from '../../../services/other/toast.service'; // Adjust the path as needed
import { inject } from '@angular/core';
import { ShippingMethodComponent } from '../../components/dialogs/shipping-method/shipping-method.component';
@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [
    TranslateModule,
    StepperModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    WeightFormComponent,
    RatesFormComponent,
    InfoFormComponent,
    ChoosePackageComponent,
    ShippingFormComponent,
  ],
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressesComponent {
  selectedCard: any = null;
  // private toastService = inject(ToastService);

  currentStep = 1;
  steps = [
    'Addresses',
    'Dimension & Weight',
    'Shipping Rates',
    'Shipment Info',
  ];

  setStep(step: number) {
    this.currentStep = step;
  }
  // setStep(step: number) {
  //   let formValid = false;

  //   if (this.currentStep === 1) {
  //     formValid = this.shippingFrom.valid && this.shippingTo.valid;
  //   } else if (this.currentStep === 2) {
  //     formValid = this.weightForm.valid;
  //   } else if (this.currentStep == 3) {
  //     formValid = this.selectedCard;
  //   } else {
  //     formValid = true; // Allow navigation for steps without forms
  //   }

  //   if (formValid || step < this.currentStep) {
  //     this.currentStep = step;
  //   } else {
  //     this.toastService.showToast_error(
  //       "Please fill in all required fields before proceeding."
  //     );
  //   }
  // }

  nextStep() {
    let formValid = false;

    if (this.currentStep === 1) {
      formValid = this.shippingFrom.valid && this.shippingTo.valid;
    } else if (this.currentStep === 2) {
      formValid = this.weightForm.valid;
    }

    if (formValid && this.currentStep < this.steps.length) {
      this.currentStep++;
    } else {
      // this.toastService.showToast_error(
      //   'Please fill in all required fields before proceeding.'
      // );
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  mainForm = new FormGroup({
    shippingFrom: new FormGroup({
      country: new FormControl([], Validators.required),
      city: new FormControl([], Validators.required),
      area: new FormControl([], Validators.required),
      floor: new FormControl([], Validators.required),
      address: new FormControl([], Validators.required),
      name: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      addressType: new FormControl('', Validators.required),
    }),
    shippingTo: new FormGroup({
      country: new FormControl([], Validators.required),
      city: new FormControl([], Validators.required),
      area: new FormControl([], Validators.required),
      floor: new FormControl([], Validators.required),
      address: new FormControl([], Validators.required),
      name: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      addressType: new FormControl('', Validators.required),
    }),
    weightForm: new FormGroup({
      length: new FormControl('', Validators.required),
      width: new FormControl('', Validators.required),
      height: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      items: new FormArray([]),
    }),
  });

  get shippingFrom(): FormGroup {
    return this.mainForm.get('shippingFrom') as FormGroup;
  }

  get shippingTo(): FormGroup {
    return this.mainForm.get('shippingTo') as FormGroup;
  }

  get weightForm(): FormGroup {
    return this.mainForm.get('weightForm') as FormGroup;
  }

  onCardSelected(card: any) {
    this.selectedCard = card;
  }
  swapForms() {
    const fromData = JSON.parse(JSON.stringify(this.shippingFrom.value));
    const toData = JSON.parse(JSON.stringify(this.shippingTo.value));

    this.shippingFrom.setValue(toData);
    this.shippingTo.setValue(fromData);
  }

  types = ['Pallet', 'Package', 'Courier-Pak', 'Envelope'];
  selectedType: string = 'Pallet';

  selectType(type: string): void {
    this.selectedType = type;
  }
  //
  @Input() isDialogRadioVisibleTo: boolean = false;
  @Input() isDialogVisibleTo: boolean = false;
  @Input() isDialogRadioVisibleFrom: boolean = false;
  @Input() isDialogVisibleFrom: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}
  dropdownTo = [
    {
      label: 'Save',
      action: () => {
        this.isDialogVisibleTo = false;
        this.cdr.detectChanges();
        this.isDialogVisibleTo = true;
      },
    },
    {
      label: 'Saved addresses',
      action: () => {
        this.isDialogRadioVisibleTo = false;
        this.cdr.detectChanges();
        this.isDialogRadioVisibleTo = true;
      },
    },
    {
      label: 'Clear',
      action: () => console.log('Clear clicked'),
    },
  ];
  dropdownFrom = [
    {
      label: 'Save',
      action: () => {
        this.isDialogVisibleFrom = false;
        this.cdr.detectChanges();
        this.isDialogVisibleFrom = true;
      },
    },
    {
      label: 'Saved addresses',
      action: () => {
        this.isDialogRadioVisibleFrom = false;
        this.cdr.detectChanges();
        this.isDialogRadioVisibleFrom = true;
      },
    },
    {
      label: 'Clear',
      action: () => console.log('Clear clicked'),
    },
  ];
}
