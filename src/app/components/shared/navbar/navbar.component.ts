import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AvatarModule } from "primeng/avatar";
import { ButtonModule } from "primeng/button";
// import { AuthService } from "../../../services/other/auth.service";
import { ChangeLangService } from "../../../services/other/change-lang.service";
import { StateService } from "../../../services/other/state.service";
import { SwitchThemeService } from "../../../services/other/switch-theme.service";
import { NgIf } from "@angular/common";
import { MenuItem } from "primeng/api/menuitem";
import { ConfirmationService } from "primeng/api";
@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [ButtonModule, AvatarModule, TranslateModule, NgIf],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  // username = localStorage.getItem("username") || "";
  dir = localStorage.getItem("direction");
  langCode = localStorage.getItem("langCode");

  currentTheme = localStorage.getItem("theme");

  isLanguageEnglish = true; // Flag to track the current language

  // closeCallback(event: any): void {
  //   console.log(event);
  // }

  items?: MenuItem[] = [
    { label: "Users", icon: "pi pi-home", routerLink: "/users" },
    { label: "Admins", icon: "pi pi-info", routerLink: "/login" },
    { label: "Categories", icon: "pi pi-envelope", routerLink: "/users" },
    { label: "Posts", icon: "pi pi-envelope", routerLink: "/contact" },
  ];

  constructor(
    private themeService: SwitchThemeService,
    private changelangService: ChangeLangService,
    public ss: StateService,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    // private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentTheme = localStorage.getItem("theme") || "light";
    this.isLanguageEnglish = this.changelangService.currentLang() === "en";
  }

  toggleLang() {
    this.confirmationService.confirm({
      header: this.translateService.instant("Change Lang"),
      message: this.translateService.instant(
        "Do you want to change the language?."
      ),
      acceptLabel: this.translateService.instant("Yes"),
      rejectLabel: this.translateService.instant("No"),
      acceptIcon: "null",
      rejectIcon: "null",
      accept: () => {
        const lang = this.isLanguageEnglish ? "ar" : "en";
        this.changeLang(lang);
        this.isLanguageEnglish = !this.isLanguageEnglish;
        window.location.reload();
      },
    });
  }

  changeLang(lang: string): void {
    this.changelangService.changeLang(lang);
  }

  swwitchTheme(theme: string): void {
    localStorage.setItem("theme", theme);
    this.themeService.switchTheme(theme);
    this.currentTheme = theme;
  }
}
