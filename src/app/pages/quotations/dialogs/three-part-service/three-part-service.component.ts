import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { AreaService } from '../../../../services/dataServices/area.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ToastService } from '../../../../services/other/toast.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ServicePartTwoComponent } from '../service-part-two/service-part-two.component';
import { Service } from '../../../../models/Interfaces/Service';
import { City } from '../../../../models/Interfaces/City';
import { Area } from '../../../../models/Interfaces/Area';
import { ChangeLangService } from '../../../../services/other/change-lang.service';

@Component({
  selector: 'app-three-part-service',
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
  templateUrl: './three-part-service.component.html',
  styleUrl: './three-part-service.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreePartServiceComponent {
  dynamicDialogRef = inject(DynamicDialogRef);
  dialogService = inject(DialogService);
  areaService = inject(AreaService);
  toastService = inject(ToastService);
  cd = inject(ChangeDetectorRef);
  translate = inject(TranslateService);
  dynamicDialogConfig = inject(DynamicDialogConfig) as {
    data: {
      obj: Service;
    };
  };
  currentLang = inject(ChangeLangService).currentLang;
  areas: any[] = [];
  selectedArea: any[][] = [];

  // selectedArea = [];
  ngOnInit(): void {
    this.getData();
    // console.log(this.dynamicDialogConfig.data.obj , 'Service Object');
  }
  getData() {
    console.log(this.dynamicDialogConfig.data?.obj.city, 'city');
    const cities = this.dynamicDialogConfig.data?.obj.city
      .map((city) => city.id)
      .filter((id): id is string => id !== undefined);
    console.log(cities, 'cities');
    this.areaService.getAreasByCities(cities).subscribe({
      next: (value) => {
        console.log('areaaaaaaaaaaaaas', value);
        this.areas = value;
        this.selectedArea = new Array(this.areas.length).fill([]);
        if (this.dynamicDialogConfig.data?.obj.area) {
          this.areas.forEach((parentArea, cityIndex) => {
            const selectedAreasForCity: Area[] = parentArea.areas.filter(
              (area: Area) =>
                this.dynamicDialogConfig.data?.obj.area.some(
                  (selectedArea: Area) => selectedArea.id === area.id
                )
            );
            this.selectedArea[cityIndex] = selectedAreasForCity;
          });
        }
        console.log('Selected areas by city:', this.selectedArea);
        this.cd.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  save() {
    console.log(this.dynamicDialogConfig.data?.obj);
    const selectedValues = this.selectedArea.flatMap((areaGroup) => {
      return areaGroup.map((area) => area);
    });
    console.log(selectedValues);
    const areaInstances = selectedValues.map((area) => area);
    console.log('Plain Selected Values:', areaInstances);
    if (this.dynamicDialogConfig.data?.obj) {
      this.dynamicDialogConfig.data.obj.area = areaInstances;
    }
    console.log(this.dynamicDialogConfig.data.obj);
    const headerText = this.translate.instant(
      this.dynamicDialogConfig.data?.obj ? 'Edit' : 'Add'
    );
    const dialog = this.dialogService.open(ServicePartTwoComponent, {
      header: headerText,
      width: '600px',
      data: { obj: this.dynamicDialogConfig.data.obj },
      rtl: true,
      footer: '.',
    });
    dialog.onClose.subscribe((object) => {
      if (object) {
        this.dynamicDialogRef.close(object);
      }
    });
  }
}
