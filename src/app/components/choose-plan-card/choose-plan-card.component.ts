import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-plan-card',
  imports: [],
  templateUrl: './choose-plan-card.component.html',
  styleUrl: './choose-plan-card.component.css',
})
export class ChoosePlanCardComponent {
  @Input() price: string = '';
  @Input() plan: string = '';
  @Input() companyName: string = '';
  @Output() planSelected: EventEmitter<any> = new EventEmitter();

  selectPlan() {
    const planData = {
      plan: this.plan,
      companyName: this.companyName,
      price: this.price,
    };
    this.planSelected.emit(planData);
  }
}
