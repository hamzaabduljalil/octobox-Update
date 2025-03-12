import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { AuthService } from "../../services/dataServices/auth.service";
import { Router } from "@angular/router";
import { ToastService } from "../../services/other/toast.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ChangeLangService } from "../../services/other/change-lang.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ButtonModule, FormsModule, InputTextModule, TranslateModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  username: string;
  password: string;
  authService = inject(AuthService);
  translate = inject(TranslateService);
  changeLang = inject(ChangeLangService);
  lang: string = "en";
  router = inject(Router);
  toast = inject(ToastService);
  currentLang: string = "en";

  ngOnInit() {}
  toggleLang() {
    this.lang = this.lang === "en" ? "ar" : "en";
    this.changeLang.changeLang(this.lang);
  }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (val: any) => {
        console.log(val, "val");
        this.toast.login_success();
        console.log("Aaaa");
        this.router.navigate(["/admin"]);
        console.log("bbbbbbbb");
      },
      error: (error) => console.error("Error logging in", error),
    });
    // this.toast.login_success();
    // console.log("Aaaa");
    // this.router.navigate(["/admin"]);
  }

  isDisabled() {
    return this.password || this.username === "";
  }
}
