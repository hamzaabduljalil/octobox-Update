import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { DialogModule } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ToastService } from "../../../../services/other/toast.service";
import { Company, CompanyDefault } from "../../../../models/Interfaces/Company";
import { MultiSelectModule } from "primeng/multiselect";
import { ShippingCompanyService } from "../../../../services/dataServices/shipping-company.service";
import { ChangeLangService } from "../../../../services/other/change-lang.service";

@Component({
  selector: "app-add-compney-dialog",
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    TranslateModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    DropdownModule,
    DividerModule,
    MultiSelectModule,
  ],
  templateUrl: "./add-compney-dialog.component.html",
  styleUrl: "./add-compney-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCompneyDialogComponent {
  dynamicDialogRef = inject(DynamicDialogRef);
  dialogService = inject(DialogService);
  dataService = inject(ShippingCompanyService);
  toastService = inject(ToastService);
  translate = inject(TranslateService);
  currentLang = inject(ChangeLangService).currentLang
  dynamicDialogConfig = inject(DynamicDialogConfig) as {
    data?: {
      obj?: Company;
    };
  };
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

