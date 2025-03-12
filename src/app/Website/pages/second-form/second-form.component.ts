import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeightFormComponent } from '../../components/weight-form/weight-form.component';
import { RatesFormComponent } from '../../components/rates-form/rates-form.component';
import { ChoosePackageComponent } from '../../components/choose-package/choose-package.component';
import { SaveAddressesComponent } from '../../components/dialogs/save-addresses/save-addresses.component';
import { ShippingFormComponent } from '../../components/shipping-form/shipping-form.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastService } from '../../../services/other/toast.service';
import { inject } from '@angular/core';
import { ShippingMethodComponent } from '../../components/dialogs/shipping-method/shipping-method.component';
@Component({
  selector: 'app-second-form',
  standalone: true,
  imports: [
    TranslateModule,
    StepperModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    WeightFormComponent,
    RatesFormComponent,
    ChoosePackageComponent,
    SaveAddressesComponent,
    ShippingFormComponent,
    MultiSelectModule,
    ShippingMethodComponent,
  ],
  templateUrl: './second-form.component.html',
  styleUrl: './second-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondFormComponent {
  selectedCard: any = null;
  private toastService = inject(ToastService);

  currentStep = 1;
  steps = [
    'Addresses',
    'Dimension & Weight',
    'Shipping Rates',
    'Shipment Info',
  ];

  setStep(step: number) {
    this.currentStep = step;
    this.resetDialogs();
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

  // nextStep() {
  //   let formValid = false;

  //   if (this.currentStep === 1) {
  //     formValid = this.shippingFrom.valid && this.shippingTo.valid;
  //   } else if (this.currentStep === 2) {
  //     console.log(this.weightForm);
  //     formValid = this.weightForm.valid;
  //   } else if (this.currentStep == 3) {
  //     formValid = this.selectedCard;
  //   }

  //   if (formValid && this.currentStep < this.steps.length) {
  //     this.currentStep++;
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
    } else if (this.currentStep == 3) {
      formValid = this.selectedCard;
    }

    if (formValid && this.currentStep < this.steps.length) {
      this.currentStep++;
    } else {
      this.toastService.showToast_error(
        'Please fill in all required fields before proceeding.'
      );
    }
    this.resetDialogs();
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
    this.resetDialogs();
  }

  mainForm = new FormGroup({
    shippingFrom: new FormGroup({
      country: new FormControl([], Validators.required),
      city: new FormControl([], Validators.required),
      address: new FormControl([], Validators.required),
      addressType: new FormControl('', Validators.required),
    }),
    shippingTo: new FormGroup({
      country: new FormControl([], Validators.required),
      city: new FormControl([], Validators.required),
      address: new FormControl([], Validators.required),
      addressType: new FormControl('', Validators.required),
    }),
    shippingFromFull: new FormGroup({
      country: new FormControl([], Validators.required),
      city: new FormControl([], Validators.required),
      area: new FormControl([], Validators.required),
      floor: new FormControl([], Validators.required),
      address: new FormControl([], Validators.required),
      name: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      addressType: new FormControl('', Validators.required),
    }),
    shippingToFull: new FormGroup({
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
      items: new FormArray([
        new FormGroup({
          length: new FormControl('', Validators.required),
          width: new FormControl('', Validators.required),
          height: new FormControl('', Validators.required),
          weight: new FormControl('', Validators.required),
          quantity: new FormControl(''),
          description: new FormControl('', Validators.required),
          isDropdownOpen: new FormControl(false),
          expanded: new FormControl(false),
        }),
      ]),
    }),
  });

  get shippingFromFull(): FormGroup {
    return this.mainForm.get('shippingFromFull') as FormGroup;
  }
  get shippingFrom(): FormGroup {
    return this.mainForm.get('shippingFrom') as FormGroup;
  }

  get shippingTo(): FormGroup {
    return this.mainForm.get('shippingTo') as FormGroup;
  }
  get shippingToFull(): FormGroup {
    return this.mainForm.get('shippingToFull') as FormGroup;
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

  @Input() isDialogRadioVisibleTo: boolean = false;
  @Input() isDialogVisibleTo: boolean = false;
  @Input() isDialogRadioVisibleFrom: boolean = false;
  @Input() isDialogVisibleFrom: boolean = false;
  @Input() isShippingDialogVisible: boolean = false;

  private resetDialogs() {
    this.isDialogVisibleTo = false;
    this.isDialogRadioVisibleTo = false;
    this.isDialogVisibleFrom = false;
    this.isDialogRadioVisibleFrom = false;
    this.isShippingDialogVisible = false;
  }
  constructor(private cdr: ChangeDetectorRef) {
    this.isDialogVisibleTo = false;
    this.isDialogRadioVisibleTo = false;
    this.isDialogVisibleFrom = false;
    this.isDialogRadioVisibleFrom = false;
  }
  dropdownTo = [
    {
      label: 'New Quote',
      action: () => {
        this.isDialogVisibleTo = false;
        this.cdr.detectChanges();
        this.isDialogVisibleTo = true;
      },
    },
    {
      label: 'Saved Quotes',
      action: () => {
        this.isDialogRadioVisibleTo = false;
        this.cdr.detectChanges();
        this.isDialogRadioVisibleTo = true;
      },
    },
  ];
  dropdownToFull = [
    {
      label: 'New Quote',
      action: () => {
        this.isDialogVisibleTo = false;
        this.cdr.detectChanges();
        this.isDialogVisibleTo = true;
      },
    },
  ];
  dropdownFromFull = [
    {
      label: 'New Quote',
      action: () => {
        this.isDialogVisibleTo = false;
        this.cdr.detectChanges();
        this.isDialogVisibleTo = true;
      },
    },
  ];
  dropdownFrom = [
    {
      label: 'New Quote',
      action: () => {
        this.isDialogVisibleFrom = false;
        this.cdr.detectChanges();
        this.isDialogVisibleFrom = true;
      },
    },
    {
      label: 'Saved Quotes',
      action: () => {
        this.isDialogRadioVisibleFrom = false;
        this.cdr.detectChanges();
        this.isDialogRadioVisibleFrom = true;
      },
    },
  ];
  openShippingDialog() {
    this.isShippingDialogVisible = true;
  }
}
