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
import { MultiSelectModule } from 'primeng/multiselect';
import { CityService } from '../../../../services/dataServices/city.service';
import { City, CityDefault } from '../../../../models/Interfaces/City';
import { ChangeLangService } from '../../../../services/other/change-lang.service';

@Component({
  selector: 'app-add-city-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    TranslateModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    DividerModule,
    MultiSelectModule,
  ],
  templateUrl: './add-city-dialog.component.html',
  styleUrl: './add-city-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCityDialogComponent {
  dynamicDialogRef = inject(DynamicDialogRef);
  dialogService = inject(DialogService);
  cityName: string = '';
  dataService = inject(CityService);
  toastService = inject(ToastService);
  translate = inject(TranslateService);
  currentLang = inject(ChangeLangService).currentLang;
  companyData: any;
  dynamicDialogConfig = inject(DynamicDialogConfig) as {
    data?: {
      obj?: City;
    };
  };
  newCity: City = CityDefault;
  saving = false;

  ngOnInit(): void {
    console.log(this.dynamicDialogConfig.data?.obj);
    if (!this.dynamicDialogConfig.data?.obj) {
      this.dynamicDialogConfig.data = {
        obj: this.newCity,
      };
    }
  }

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
