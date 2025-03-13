import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChoosePackageComponent } from '../../components/choose-package/choose-package.component';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../../services/other/toast.service';

@Component({
  selector: 'app-saved-packages',
  standalone: true,
  imports: [
    ChoosePackageComponent,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
  ],
  templateUrl: './saved-packages.component.html',
  styleUrl: './saved-packages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedPackagesComponent {
  // submittedItems: any[] = [];
  submittedItems: any[] = [
    {
      length: '3',
      weight: '3',
      height: '3',
      width: '3',
      description:
        'Description Description Description Description Description',
    },
  ];
  packageForm!: FormGroup;
  editIndex: number | null = null;
  dropdownIndex: number | null = null;

  constructor(private fb: FormBuilder, private toastService: ToastService) {
    this.initializeForm();
  }

  types = ['Pallet', 'Package', 'Courier-Pak', 'Envelope'];
  selectedType: string = 'Pallet';

  selectType(type: string): void {
    this.selectedType = type;
  }

  mainForm!: FormGroup;

  private initializeForm() {
    this.mainForm = new FormGroup({
      packageFrom: new FormGroup({
        length: new FormControl('', [Validators.required, Validators.min(1)]),
        weight: new FormControl('', [Validators.required, Validators.min(1)]),
        height: new FormControl('', [Validators.required, Validators.min(1)]),
        width: new FormControl('', [Validators.required, Validators.min(1)]),
        description: new FormControl('', Validators.required),
      }),
    });
  }

  get packageFrom(): FormGroup {
    return this.mainForm.get('packageFrom') as FormGroup;
  }

  toggleDropdown(index: number): void {
    this.dropdownIndex = this.dropdownIndex === index ? null : index;
  }

  deleteItem(index: number): void {
    this.submittedItems.splice(index, 1);
    this.dropdownIndex = null;
  }
  resetItem() {
    this.packageFrom.reset();
  }

  editItem(index: number): void {
    this.editIndex = index;
    const item = this.submittedItems[index];

    this.packageFrom.patchValue({
      length: item.length,
      width: item.width,
      height: item.height,
      weight: item.weight,
      description: item.description,
    });

    this.dropdownIndex = null;
  }

  // Handle form submission
  onSubmit(): void {
    if (!this.packageFrom) {
      this.toastService.showToast_error('packageFrom is undefined');
      return;
    }

    if (this.packageFrom.invalid) {
      this.toastService.showToast_error(
        'Please fill in all required fields before proceeding.'
      );
      return;
    }

    if (this.editIndex !== null) {
      this.submittedItems[this.editIndex] = this.packageFrom.value;
      this.editIndex = null;
    } else {
      this.submittedItems.push(this.packageFrom.value);
    }

    this.packageFrom.reset();
  }
}
