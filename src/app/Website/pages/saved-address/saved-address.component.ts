import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ShippingFormComponent } from '../../components/shipping-form/shipping-form.component';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../../services/other/toast.service';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@Component({
  selector: 'app-saved-address',
  standalone: true,
  imports: [
    ButtonModule,
    ShippingFormComponent,
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
  ],
  providers: [ToastService], // <-- Add this if not provided globally
  templateUrl: './saved-address.component.html',
  styleUrl: './saved-address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedAddressComponent {
  // savedAddresses: any[] = [];
  savedAddresses: any[] = [
    {
      country: 'USA',
      city: 'New York',
      area: 'Manhattan',
      floor: '3',
      address: '123 Main Street',
      name: 'John Doe',
      number: '1234567890',
      addressType: 'Home',
    },
  ];

  editIndex: number | null = null;
  dropdownIndex: number | null = null;
  mainForm!: FormGroup;

  constructor(private fb: FormBuilder, private toastService: ToastService) {
    this.initializeForm();
  }

  private initializeForm() {
    this.mainForm = new FormGroup({
      shippingFrom: new FormGroup({
        country: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        floor: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        number: new FormControl('', [Validators.required]),
        addressType: new FormControl('', Validators.required),
      }),
    });
  }

  get shippingFrom(): FormGroup {
    return this.mainForm.get('shippingFrom') as FormGroup;
  }

  toggleDropdown(index: number): void {
    this.dropdownIndex = this.dropdownIndex === index ? null : index;
  }

  deleteAddress(index: number): void {
    this.savedAddresses.splice(index, 1);
    this.dropdownIndex = null;
  }
  resetAddress() {
    this.shippingFrom.reset();
  }

  editAddress(index: number): void {
    this.editIndex = index;
    const address = this.savedAddresses[index];

    this.shippingFrom.patchValue({
      country: address.country,
      city: address.city,
      area: address.area,
      floor: address.floor,
      address: address.address,
      name: address.name,
      number: address.number,
      addressType: address.addressType,
    });

    this.dropdownIndex = null;
  }

  onSubmit(): void {
    if (!this.shippingFrom) {
      this.toastService.showToast_error('packageFrom is undefined');
      return;
    }

    if (this.shippingFrom.invalid) {
      this.toastService.showToast_error(
        'Please fill in all required fields before proceeding.'
      );
      return;
    }

    if (this.editIndex !== null) {
      this.savedAddresses[this.editIndex] = this.shippingFrom.value;
      this.editIndex = null;
    } else {
      this.savedAddresses.push(this.shippingFrom.value);
    }

    this.shippingFrom.reset();
  }
}
