import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  HostListener,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { SaveRadioComponent } from '../dialogs/save-radio/save-radio.component';
import { SaveAddressesComponent } from '../dialogs/save-addresses/save-addresses.component';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-shipping-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MultiSelectModule,
    SaveRadioComponent,
    ButtonModule,
    SaveAddressesComponent,
  ],
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingFormComponent {
  @Input() title!: string;
  @Input() form!: FormGroup;
  @Input() selectedType: string = '';
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Input() isShow: boolean = false; // This will track the visibility state
  @Input() isShowRadio: boolean = false; // This will track the visibility state
  @Output() isShowChange = new EventEmitter<boolean>(); // Emits when changed
  @Output() isShowRadioChange = new EventEmitter<boolean>(); // Emits when changed
  @Input() fieldsToShow: any = [];
  @Input() items: any[] = [];
  @Input() isDialogVisibleTo: boolean = false;
  @Input() isDialogVisibleFrom: boolean = false;
  @Input() isDialogRadioVisibleTo: boolean = false;
  @Input() isDialogRadioVisibleFrom: boolean = false;
  @Input() isDialogVisible: boolean = false;
  @Input() isDialogRadioVisible: boolean = false;
  @Output() isDialogVisibleChange = new EventEmitter<boolean>();
  @Output() isDialogRadioVisibleChange = new EventEmitter<boolean>();

  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
  addresses = [
    {
      title: 'Address Name',
      description:
        'City - Area - address address address address address address address ',
    },
    {
      title: 'Address Name',
      description:
        'City - Area - address address address address address address address ',
    },
    {
      title: 'Address Name',
      description:
        'City - Area - address address address address address address address ',
    },
  ];
  selectType(type: string): void {
    this.selectedType = type;
  }

  onSubmit() {}
  addressType = '';
  isDropdownOpen = false;
  parentDialogVisible: boolean = false;

  onDialogVisibleChange(newValue: boolean) {
    this.parentDialogVisible = newValue; // Update parent state
  }

  openDialog() {
    if (this.isDialogVisibleTo || this.isDialogVisibleFrom) {
      this.isDialogVisible = true;
    }
    this.isDialogVisibleChange.emit(this.isDialogVisible);
  }
  openDialogRadio() {
    if (this.isDialogRadioVisibleTo || this.isDialogRadioVisibleFrom) {
      this.isDialogRadioVisible = true;
    }
    this.isShowRadioChange.emit(this.isDialogRadioVisible);
  }

  toggleShow() {
    this.isShow = !this.isShow;
    this.isShowChange.emit(this.isShow);
  }
  toggleShowRadio() {
    this.isShowRadio = !this.isShowRadio;
    this.isShowRadioChange.emit(this.isShowRadio);
  }
  constructor(private eRef: ElementRef) {}
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    if (this.isOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }
}
