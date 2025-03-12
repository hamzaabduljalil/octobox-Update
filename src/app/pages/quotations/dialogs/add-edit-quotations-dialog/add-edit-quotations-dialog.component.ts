import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastService } from '../../../../services/other/toast.service';
import { CityService } from '../../../../services/dataServices/city.service';
import { ShippingCompanyService } from '../../../../services/dataServices/shipping-company.service';
import { ShippingTypeService } from '../../../../services/dataServices/shipping-type.service';
import { ThreePartServiceComponent } from '../three-part-service/three-part-service.component';
import { Service, ServiceDefault } from '../../../../models/Interfaces/Service';
import { Company } from '../../../../models/Interfaces/Company';
import { City } from '../../../../models/Interfaces/City';
import { ShippingType } from '../../../../models/Interfaces/ShippingType';
import { ChangeLangService } from '../../../../services/other/change-lang.service';

@Component({
  selector: 'app-add-edit-quotations-dialog',
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
  templateUrl: './add-edit-quotations-dialog.component.html',
  styleUrl: './add-edit-quotations-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditQuotationsDialogComponent {
  dynamicDialogRef = inject(DynamicDialogRef);
  dialogService = inject(DialogService);
  cityService = inject(CityService);
  shippingType = inject(ShippingTypeService);
  companyService = inject(ShippingCompanyService);
  translate = inject(TranslateService);
  currentLang = inject(ChangeLangService).currentLang;
  shippingTypes = signal<ShippingType[]>([]);
  selectedShippingType?: ShippingType;
  cities = signal<City[]>([]);
  selectedCities?: City[];
  companies = signal<Company[]>([]);
  selectedCompany?: Company;
  name?: string;
  toastService = inject(ToastService);
  dynamicDialogConfig = inject(DynamicDialogConfig) as {
    data: {
      obj: Service;
    };
  };
  newService: Service = ServiceDefault;

  ngOnInit(): void {
    console.log(this.dynamicDialogConfig.data?.obj, 'obj');
    if (!this.dynamicDialogConfig.data?.obj) {
      this.dynamicDialogConfig.data = {
        obj: this.newService,
      };
    }
    this.getData();
  }
  getData() {
    this.cityService.get({}).subscribe({
      next: (value) => {
        this.cities.set(value);
        if (this.dynamicDialogConfig.data?.obj?.city) {
          this.dynamicDialogConfig.data.obj.city = this.cities().filter(
            (city) =>
              this.dynamicDialogConfig.data.obj.city.some(
                (selectedCity) => selectedCity.id === city.id
              )
          );
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
    this.shippingType.getShippingTypes().subscribe({
      next: (value) => {
        this.shippingTypes.set(value);
        console.log(this.dynamicDialogConfig.data?.obj.shippingType);
        if (this.dynamicDialogConfig.data.obj.shippingType) {
          this.dynamicDialogConfig.data.obj.shippingType =
            this.shippingTypes().find(
              (type) =>
                type.id === this.dynamicDialogConfig.data?.obj.shippingType?.id
            )!;
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
    this.companyService.get({}).subscribe({
      next: (value) => {
        console.log(value);
        this.companies.set(value);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  saving = false;
  save() {
    console.log(this.dynamicDialogConfig.data?.obj, 'obj');
    this.dynamicDialogConfig.data.obj.shippingType =
      this.shippingTypes().find(
        (type) => type.id === this.dynamicDialogConfig.data?.obj.shippingType.id
      ) || this.dynamicDialogConfig.data.obj.shippingType;
    const headerText = this.translate.instant(
      this.dynamicDialogConfig.data?.obj ? 'Edit' : 'Add'
    );
    console.log(this.dynamicDialogConfig.data.obj, 'quotaion');

    const dialog = this.dialogService.open(ThreePartServiceComponent, {
      header: headerText,
      footer: '.',
      width: '600px',
      data: { obj: this.dynamicDialogConfig.data?.obj },
      rtl: true,
    });
    dialog.onClose.subscribe({
      next: (value) => {
        console.log(value);
        this.dynamicDialogConfig.data.obj = this.newService;
        this.dynamicDialogRef.close(value);
      },
    });
  }
}
