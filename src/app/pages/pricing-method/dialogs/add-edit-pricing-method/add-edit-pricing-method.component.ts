import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastService } from '../../../../services/other/toast.service';
import { CityService } from '../../../../services/dataServices/city.service';
import { PricingMethodService } from '../../../../services/dataServices/pricing-method.service';
import {
  PricingMethod,
  PricingMethodDefault,
} from '../../../../models/Interfaces/PricingMethod';

@Component({
  selector: 'app-add-edit-pricing-method',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    TranslateModule,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './add-edit-pricing-method.component.html',
  styleUrl: './add-edit-pricing-method.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditPricingMethodComponent {
  dynamicDialogRef = inject(DynamicDialogRef);
  dialogService = inject(DialogService);
  cityService = inject(CityService);
  PricingMethodName: string = '';
  toastService = inject(ToastService);
  translate = inject(TranslateService);
  PricingMethodService = inject(PricingMethodService);
  cd = inject(ChangeDetectorRef);
  companyData: any;
  dynamicDialogConfig = inject(DynamicDialogConfig) as {
    data: {
      obj: PricingMethod;
    };
  };
  currentLang: string = 'en';
  newPricingMethod: PricingMethod = PricingMethodDefault;
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
    this.currentLang = this.translate.currentLang || 'en';
    console.log(this.dynamicDialogConfig.data?.obj);
    if (!this.dynamicDialogConfig.data?.obj) {
      this.dynamicDialogConfig.data = {
        obj: this.newPricingMethod,
      };
      console.log(
        this.dynamicDialogConfig.data?.obj,
        'dynamicDialogConfig.data?.obj'
      );
    }
  }
  saving = false;

  save() {
    const pricingMethodToSave = this.dynamicDialogConfig.data?.obj;
    if (pricingMethodToSave && pricingMethodToSave.id) {
      const id = pricingMethodToSave.id;
      this.PricingMethodService.save(
        pricingMethodToSave || this.newPricingMethod,
        id
      ).subscribe({
        next: (value) => {
          console.log(value, 'updated');
          this.toastService.showToast_success();
          this.dynamicDialogRef.close(value);
        },
        error: (err) => {
          this.toastService.showToast_error(err);
        },
      });
    } else {
      this.PricingMethodService.save(this.newPricingMethod).subscribe({
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
}
