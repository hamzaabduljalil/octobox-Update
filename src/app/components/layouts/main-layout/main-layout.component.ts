import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { ToastModule } from "primeng/toast";
import { ToastService } from "../../../services/other/toast.service";
import { ConfirmDialogComponent } from "../../shared/dialogs/confirm-dialog/confirm-dialog.component";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-main-layout",
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, ToastModule],
  templateUrl: "./main-layout.component.html",
  styleUrl: "./main-layout.component.scss",
  providers: [ToastService, DialogService, ConfirmDialogComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  router = inject(Router);

  ngOnInit(): void {
    const token = localStorage.getItem("access_token");
    if (!token) {
      this.router.navigate(["/login"]);
    }
  }
}
