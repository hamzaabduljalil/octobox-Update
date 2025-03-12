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
import { PackageTypeService } from '../../../../services/dataServices/package-type.service';
import {
  PackageType,
  PackageTypeDefault,
} from '../../../../models/Interfaces/PackageType';
import { ChangeLangService } from '../../../../services/other/change-lang.service';

@Component({
  selector: 'app-add-edit-packagetype',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    TranslateModule,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './add-edit-packagetype.component.html',
  styleUrl: './add-edit-packagetype.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditPackagetypeComponent {
  dynamicDialogRef = inject(DynamicDialogRef);
  dialogService = inject(DialogService);
  dataService = inject(PackageTypeService);
  toastService = inject(ToastService);
  translate = inject(TranslateService);
  currentLang = inject(ChangeLangService).currentLang;
  packageName: string = '';
  packageId: string = '';
  packageTypeData: any;
  dynamicDialogConfig = inject(DynamicDialogConfig) as {
    data: {
      obj: PackageType;
    };
  };
  newPackageType: PackageType = PackageTypeDefault;
  ngOnInit(): void {
    if (!this.dynamicDialogConfig.data?.obj) {
      this.dynamicDialogConfig.data = {
        obj: this.newPackageType,
      };
    }
  }
  saving = false;

  save() {
    this.dataService
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
