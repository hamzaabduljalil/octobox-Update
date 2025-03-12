import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ToastService } from "../../../../services/other/toast.service";
import { ButtonModule } from "primeng/button";
@Component({
  selector: "app-shared-dialogs-footer",
  standalone: true,
  imports: [ButtonModule],
  templateUrl: "./shared-dialogs-footer.component.html",
  styleUrl: "./shared-dialogs-footer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedDialogsFooterComponent {
  dialogRef = inject(DynamicDialogRef) as any;
  dynamicDialogConfig = inject(DynamicDialogConfig) as any;
  toastService = inject(ToastService) as any;

  closeTitle = input("Close");
  saveTitle = input("Save");

  close() {
    this.dialogRef.close("Hi");
  }

  save(): void {
    // if (this.form.invalid) {
    //   return;
    // }
    // this.saving = true;
    // this.cd.detectChanges();
    this.dynamicDialogConfig.data
      .save()
      .finally(() => {
        // this.saving = false;
        // this.cd.detectChanges();
      })
      .then((x: Object) => {
        this.dialogRef.close(x);
        this.toastService.showToast_success();
      })
      .catch((err: Error) => {
        this.toastService.showToast_error(err.message);
      });
  }
}
