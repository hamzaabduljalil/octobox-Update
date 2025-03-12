import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { ShippingFormComponent } from "../../components/shipping-form/shipping-form.component";
import {
  FormGroup,
  FormControl,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
@Component({
  selector: "app-saved-address",
  standalone: true,
  imports: [ButtonModule, ShippingFormComponent],
  templateUrl: "./saved-address.component.html",
  styleUrl: "./saved-address.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedAddressComponent {
  mainForm = new FormGroup({
    shippingFrom: new FormGroup({
      country: new FormControl([], Validators.required),
      city: new FormControl([], Validators.required),
      area: new FormControl([], Validators.required),
      floor: new FormControl([], Validators.required),
      address: new FormControl([], Validators.required),
      name: new FormControl("", Validators.required),
      number: new FormControl("", Validators.required),
      addressType: new FormControl("", Validators.required),
    }),
  });

  get shippingFrom(): FormGroup {
    return this.mainForm.get("shippingFrom") as FormGroup;
  }
}
