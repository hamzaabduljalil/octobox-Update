import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-info-form',
  imports: [CardModule, AvatarModule, ButtonModule, CommonModule],
  templateUrl: './info-form.component.html',
  styleUrl: './info-form.component.css',
})
export class InfoFormComponent {
  @Input() shippingFrom: any;
  @Input() shippingTo: any;
  @Input() secondForm: any;
  @Input() selectedCard: any;
  @Input() selectedPlan: any;

  ngOnChanges(changes: SimpleChanges) {
    console.log('Second Form Data in Info Form:', this.selectedCard);
  }
  get items(): FormArray {
    return this.secondForm?.get('items') as FormArray;
  }
}
