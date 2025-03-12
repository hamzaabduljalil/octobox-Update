import { inject, Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  messageService = inject(MessageService);
  translate = inject(TranslateService);

  showToast(
    severity: "success" | "info" | "warn" | "error",
    summary: string,
    detail: string
  ): void {
    this.messageService.add({ severity, summary, detail });
  }

  showToast_success(): void {
    this.showToast("success", this.translate.instant("Success"), this.translate.instant("Save Successfully"));
  }
  login_success(): void {
    this.showToast("success", this.translate.instant("Success"), this.translate.instant("Login Successfully!"));
  }
  showToast_error(error: string): void {
    this.showToast("error", this.translate.instant("Error"), error);
  }
}
