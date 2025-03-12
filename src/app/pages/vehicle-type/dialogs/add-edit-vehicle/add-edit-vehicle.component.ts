import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { InputTextModule } from "primeng/inputtext";
import { ToastService } from "../../../../services/other/toast.service";
import { CityService } from "../../../../services/dataServices/city.service";
import { PricingMethodService } from "../../../../services/dataServices/pricing-method.service";
import { VehicleTypeService } from "../../../../services/dataServices/vehicle-type.service";
import { Vehicle, VehicleDefault } from "../../../../models/Interfaces/Vehicle";
import { ChangeLangService } from "../../../../services/other/change-lang.service";

@Component({
  selector: "app-add-edit-vehicle",
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    TranslateModule,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: "./add-edit-vehicle.component.html",
  styleUrl: "./add-edit-vehicle.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditVehicleComponent {
  dynamicDialogRef = inject(DynamicDialogRef);
  dialogService = inject(DialogService);
  toastService = inject(ToastService);
  vehicleService = inject(VehicleTypeService);
  currentLang = inject(ChangeLangService).currentLang
  translate = inject(TranslateService);
  dynamicDialogConfig = inject(DynamicDialogConfig) as {
    data?: {
      obj?: Vehicle;
    };
  };

  saving = false;

  save() {
    this.vehicleService
      .save(
        this.dynamicDialogConfig.data?.obj,
        this.dynamicDialogConfig.data?.obj.id
      )
      .subscribe({
        next: (value) => {
          this.toastService.showToast_success();
          this.dynamicDialogRef.close(value);
        },
        error: (err) => {
          this.toastService.showToast_error(err);
        },
      });
  }
}
