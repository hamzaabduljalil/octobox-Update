import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { CardModule } from "primeng/card";
import { AvatarModule } from "primeng/avatar";
import { ButtonModule } from "primeng/button";
@Component({
  selector: "app-choose-company-card",
  standalone: true,
  imports: [CardModule, AvatarModule, ButtonModule],
  templateUrl: "./choose-company-card.component.html",
  styleUrl: "./choose-company-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseCompanyCardComponent {
  @Input() Company: string = "";
  @Input() Service: string = "";
  @Input() price: string = "";
  @Input() button: string = "";
  @Output() cardSelected: EventEmitter<any> = new EventEmitter();

  selectCard() {
    const cardData = {
      company: this.Company,
      service: this.Service,
      price: this.price,
    };
    this.cardSelected.emit(cardData);
  }
}
