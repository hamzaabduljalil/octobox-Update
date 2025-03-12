import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { ToastService } from "../../../../services/other/toast.service";
import { PackageTypeService } from "../../../../services/dataServices/package-type.service";
import { PricingMethodService } from "../../../../services/dataServices/pricing-method.service";
import { VehicleTypeService } from "../../../../services/dataServices/vehicle-type.service";
import { ServiceService } from "../../../../services/dataServices/service.service";
import { Service } from "../../../../models/Interfaces/Service";
import { AddRangeDialogComponent } from "../add-range-dialog/add-range-dialog.component";
import { ChoosePricingComponent } from "../choose-pricing/choose-pricing.component";
import { PackageType } from "../../../../models/Interfaces/PackageType";
import { PricingMethod } from "../../../../models/Interfaces/PricingMethod";
import { Vehicle } from "../../../../models/Interfaces/Vehicle";
import { ChangeLangService } from "../../../../services/other/change-lang.service";

@Component({
  selector: "app-service-part-two",
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    TranslateModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
  ],
  templateUrl: "./service-part-two.component.html",
  styleUrl: "./service-part-two.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicePartTwoComponent {
  dynamicDialogRef = inject(DynamicDialogRef);
  dialogService = inject(DialogService);
  serviceService = inject(ServiceService);
  packageService = inject(PackageTypeService);
  vehicleServiec = inject(VehicleTypeService);
  translate = inject(TranslateService);
  currentLang = inject(ChangeLangService).currentLang;
  packageTypes = signal<PackageType[]>([]);
  selectedPackages = signal<PackageType[]>([]);
  selectedPricingMethod: PricingMethod;
  vehicleTypesArray = signal<Vehicle[]>([]);
  selectedVehicleTypes = signal<Vehicle[]>([]);
  priceFees: number;
  from: number;
  to: number;
  maxLength: number = 0;
  maxWidth: number = 0;
  maxHeight: number = 0;
  maxWeight: number = 0;
  minWeight: number;
  toastService = inject(ToastService);
  companyData: any;
  dynamicDialogConfig = inject(DynamicDialogConfig) as {
    data?: {
      obj?: Service;
    };
  };
  ngOnInit(): void {
    console.log(this.dynamicDialogConfig.data.obj, "ddddd");

    this.getData();
  }
  getData() {
    const data = this.dynamicDialogConfig.data.obj;
    this.packageService.get({}).subscribe({
      next: (value) => {
        console.log(value);
        this.packageTypes.set(value);
        if (data?.packageType) {
          data.packageType = this.packageTypes().filter((packageType) =>
            data.packageType.some(
              (selectedPackageType) => selectedPackageType.id === packageType.id
            )
          );
        }
        this.maxHeight = data.maxHeight;
        this.maxLength = data.maxLength;
        this.maxWidth = data.maxWidth;
      },
      error: (e) => {
        console.log(e);
      },
    });
    this.vehicleServiec.get({}).subscribe({
      next: (value) => {
        console.log(value);
        this.vehicleTypesArray.set(value);
        if (this.dynamicDialogConfig.data?.obj?.vehicle) {
          this.dynamicDialogConfig.data.obj.vehicle =
            this.vehicleTypesArray().filter((vehicle) =>
              this.dynamicDialogConfig.data.obj.vehicle.some(
                (selectedVehicle) => selectedVehicle.id === vehicle.id
              )
            );
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  saving = false;

  openPricingDialog() {
    const headerText = this.translate.instant("Choose Pricing");
    const dialog = this.dialogService.open(ChoosePricingComponent, {
      header: headerText,
      footer: ".",
      width: "600px",
      data: { obj: this.dynamicDialogConfig.data?.obj.price },
      rtl: true,
    });
    dialog.onClose.subscribe((object) => {
      console.log(object);
      if (object) {
        this.dynamicDialogConfig.data.obj.price = object;
      }
    });
  }
  save() {
    const maxDimension = this.maxWidth * this.maxHeight * this.maxLength;

    this.dynamicDialogConfig.data.obj.maxDimension = maxDimension;
    this.dynamicDialogConfig.data.obj.maxWidth = this.maxWidth;
    this.dynamicDialogConfig.data.obj.maxHeight = this.maxHeight;
    this.dynamicDialogConfig.data.obj.maxLength = this.maxLength;

    console.log(this.dynamicDialogConfig.data?.obj, "data");
    const modifiedService = {
      ...this.dynamicDialogConfig.data?.obj,
      shippingCompany: this.dynamicDialogConfig.data.obj.shippingCompany.id,
      shippingType: this.dynamicDialogConfig.data.obj.shippingType.id,
      packageType: this.dynamicDialogConfig.data?.obj.packageType.map(
        (packageType) => ({
          id: packageType.id,
        })
      ),
      vehicle: this.dynamicDialogConfig.data?.obj.vehicle.map((vehicle) => ({
        id: vehicle.id,
      })),
      area: this.dynamicDialogConfig.data?.obj.area.map((area) => ({
        id: area.id,
      })),
      city: this.dynamicDialogConfig.data?.obj.city.map((city) => ({
        id: city.id,
      })),
      pricingMethod: this.dynamicDialogConfig.data?.obj.pricingMethod.map(
        (pricingMethod) => ({
          id: pricingMethod.id,
        })
      ),
      price: this.dynamicDialogConfig.data?.obj.price.map((price) => ({
        price,
      })),
    };
    console.log(modifiedService, "modifiedService");
    if (this.dynamicDialogConfig.data?.obj.id) {
      const id = this.dynamicDialogConfig.data?.obj.id;
      this.serviceService
        .save(this.dynamicDialogConfig.data?.obj, id)
        .subscribe({
          next: (value) => {
            console.log(value, "value");
            this.toastService.showToast_success();
            this.dynamicDialogRef.close(value);
          },
          error: (err) => {
            this.toastService.showToast_error(err);
          },
        });
    } else {
      this.serviceService.save(this.dynamicDialogConfig.data?.obj).subscribe({
        next: (value) => {
          console.log(value, "value");
          this.toastService.showToast_success();
          this.dynamicDialogRef.close(value);
        },
        error: (err) => {
          this.toastService.showToast_error(err);
        },
      });
    }
  }
}
