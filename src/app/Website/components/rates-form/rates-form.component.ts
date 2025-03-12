import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from "@angular/core";
import { CardModule } from "primeng/card";
import { AvatarModule } from "primeng/avatar";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { ChooseCompanyCardComponent } from "../choose-company-card/choose-company-card.component";
@Component({
  selector: "app-rates-form",
  standalone: true,
  imports: [
    CardModule,
    AvatarModule,
    ButtonModule,
    CommonModule,
    ChooseCompanyCardComponent,
  ],
  templateUrl: "./rates-form.component.html",
  styleUrl: "./rates-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatesFormComponent {
  cards = [
    { company: "Company Name", service: "Services", price: "1 Day - $15.00" },
    { company: "Company Name", service: "Services", price: "1 Day - $15.00" },
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
