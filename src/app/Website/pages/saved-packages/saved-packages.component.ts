import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ChoosePackageComponent } from "../../components/choose-package/choose-package.component";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-saved-packages",
  standalone: true,
  imports: [ChoosePackageComponent, ButtonModule],
  templateUrl: "./saved-packages.component.html",
  styleUrl: "./saved-packages.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedPackagesComponent {
  types = ["Pallet", "Package", "Courier-Pak", "Envelope"];
  selectedType: string = "Pallet";

  selectType(type: string): void {
    this.selectedType = type;
  }
}
