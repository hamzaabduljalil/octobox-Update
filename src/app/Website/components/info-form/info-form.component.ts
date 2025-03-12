import {
  Component,
  Input,
  SimpleChanges,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FormGroup, FormControl, FormArray, FormBuilder } from "@angular/forms";
import { CardModule } from "primeng/card";
import { AvatarModule } from "primeng/avatar";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-info-form",
  standalone: true,
  imports: [CardModule, AvatarModule, ButtonModule, CommonModule],
  templateUrl: "./info-form.component.html",
  styleUrl: "./info-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoFormComponent {
  @Input() shippingFrom!: FormGroup;
  @Input() shippingTo!: FormGroup;
  @Input() weightForm!: FormGroup;
  @Input() selectedCard: any;

  ngOnChanges(changes: SimpleChanges) {
    console.log("Second Form Data in Info Form:", this.shippingFrom.value);
  }
  get items(): FormArray {
    return this.weightForm?.get("items") as FormArray;
  }
}
