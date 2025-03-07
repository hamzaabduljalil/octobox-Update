import { Component, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

interface Option {
  name: string;
  code: string;
}

@Component({
  selector: 'app-input-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './input-selector.component.html',
  styleUrl: './input-selector.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectorComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class InputSelectorComponent implements ControlValueAccessor {
  @Input() label: string = 'Select an option';
  @Input() placeholder: string = 'Choose';
  @Input() options: Option[] = [];

  selectedOption: Option | undefined;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: Option): void {
    this.selectedOption = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onSelectionChange() {
    this.onChange(this.selectedOption);
    this.onTouched();
  }
}
