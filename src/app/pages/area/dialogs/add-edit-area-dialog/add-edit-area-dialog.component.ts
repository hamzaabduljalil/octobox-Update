import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastService } from '../../../../services/other/toast.service';
import { CityService } from '../../../../services/dataServices/city.service';
import { AreaService } from '../../../../services/dataServices/area.service';
import { City } from '../../../../models/Interfaces/City';
import { Area, AreaDefault } from '../../../../models/Interfaces/Area';

@Component({
  selector: 'app-add-edit-area-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    DialogModule,
    TranslateModule,
    CheckboxModule,
    DropdownModule,
    DividerModule,
  ],
  templateUrl: './add-edit-area-dialog.component.html',
  styleUrl: './add-edit-area-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditAreaDialogComponent {
  dynamicDialogRef = inject(DynamicDialogRef);
  dialogService = inject(DialogService);
  cityService = inject(CityService);
  toastService = inject(ToastService);
  dataService = inject(AreaService);
  cd = inject(ChangeDetectorRef);
  translate = inject(TranslateService);
  cities: City[] = [];
  dynamicDialogConfig = inject(DynamicDialogConfig) as {
    data?: {
      obj?: Area;
    };
  };
  newArea: Area = AreaDefault;
  currentLang: string = 'en';
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
    this.currentLang = this.translate.currentLang || 'en';
    if (!this.dynamicDialogConfig.data?.obj) {
      this.dynamicDialogConfig.data!.obj = this.newArea;
      console.log(this.newArea, 'newArea');
    }
    this.getCity();
  }
  getCity() {
    this.cityService.get({}).subscribe({
      next: (data) => {
        console.log(data, 'cities');
        this.cities = data;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.toastService.showToast_error('Error fetching cities');
      },
    });
  }
  saving = false;

  save() {
    this.dataService
      .save(
        this.dynamicDialogConfig.data?.obj!,
        this.dynamicDialogConfig.data?.obj!.id
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
