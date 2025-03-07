import { Component, Output, EventEmitter } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { ChoosePlanCardComponent } from '../choose-plan-card/choose-plan-card.component';

@Component({
  selector: 'app-rates-form',
  imports: [
    CardModule,
    AvatarModule,
    ButtonModule,
    CardComponent,
    CommonModule,
    ChoosePlanCardComponent,
  ],
  templateUrl: './rates-form.component.html',
  styleUrls: ['./rates-form.component.css'],
})
export class RatesFormComponent {
  cards = [
    { company: 'Company Name', service: 'Services', price: '1 Day - $15.00' },
    { company: 'Company Name', service: 'Services', price: '1 Day - $15.00' },
  ];
  plan = [
    { plan: 'Best Price', companyName: 'companyName', price: '1 Day - $15.00' },
    { plan: 'Best Price', companyName: 'companyName', price: '1 Day - $15.00' },
  ];
  selectedCard: any = null;
  selectedPlan: any = null;

  @Output() cardSelected = new EventEmitter<any>();
  @Output() planSelected = new EventEmitter<any>();

  handleCardSelection(card: any) {
    this.selectedCard = card;
    this.cardSelected.emit(this.selectedCard);
  }
  handlePlanSelection(plan: any) {
    this.selectedPlan = plan;
    this.planSelected.emit(this.selectedPlan);
  }
}
