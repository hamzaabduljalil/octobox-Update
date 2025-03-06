import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
})
export class RadioGroupComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() name!: string;
  @Input() value!: string;
  selectedValue!: string;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onSelectionChange() {
    this.onChange(this.value);
    this.onTouched();
  }
}
