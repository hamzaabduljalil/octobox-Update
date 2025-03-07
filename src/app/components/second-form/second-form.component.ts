import { Component, Input } from '@angular/core';
import { InputSelectorComponent } from '../input-selector/input-selector.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { InputFieldComponent } from '../input-field/input-field.component';
import { ChoosePackageComponent } from '../choose-package/choose-package.component';

@Component({
  selector: 'app-second-form',
  standalone: true, // ✅ Standalone component
  imports: [
    InputSelectorComponent,
    ReactiveFormsModule, // ✅ Correctly importing ReactiveFormsModule
    CommonModule, // ✅ Import CommonModule to use ngFor
    InputFieldComponent,

    ChoosePackageComponent,

    ChoosePackageComponent,
  ],
  templateUrl: './second-form.component.html',
  styleUrls: ['./second-form.component.css'], // ✅ Fixed "styleUrl" -> "styleUrls"
})
export class SecondFormComponent {
  quantity = [
    { name: '1', code: '1' },
    { name: '2', code: '2' },
    { name: '3', code: '3' },
    { name: '4', code: '4' },
    { name: '5', code: '5' },
  ];
  onCitySelected(selected: any) {
    console.log('Selected City:', selected);
  }

  @Input() form!: FormGroup; // Receive the form from MainFormComponent

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (!this.form) {
      this.form = this.fb.group({
        length: [''],
        width: [''],
        height: [''],
        weight: [''],
        description: [''],
        quantity: [''],
        items: this.fb.array([]),
      });
    }
    this.addItem();
    console.log('SecondForm Initialized:', this.form?.value);
  }

  addItem() {
    this.items.push(
      this.fb.group({
        length: [''],
        width: [''],
        height: [''],
        weight: [''],
        description: [''],
        expanded: [false],
      })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  toggleExpand(index: number) {
    const item = this.items.at(index);
    item.patchValue({ expanded: !item.value.expanded });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  @Input() selectedType: string = '';

  selectType(type: string): void {
    this.selectedType = type;
  }
}
