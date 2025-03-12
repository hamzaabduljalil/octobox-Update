import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { PrimeNGConfig } from 'primeng/api';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { ToastModule } from 'primeng/toast';
// import { ChangeLangService } from './services/other/change-lang.service';
// import { StateService } from './services/other/state.service';
// import { SwitchThemeService } from './services/other/switch-theme.service';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-project';
  // themeService = inject(SwitchThemeService);
  // // primengConfig = inject(PrimeNGConfig);
  // stateService = inject(StateService);
  // cls = inject(ChangeLangService);

  // ngOnInit(): void {
  //   // document.documentElement.style.fontSize = `${"11"}px`;
  //   // this.primengConfig.ripple = true;
  //   // this.primengConfig.inputStyle.set('filled');
  //   this.setTheme();
  //   this.setLang();
  // }
  // setTheme() {
  //   this.themeService.switchTheme(
  //     localStorage.getItem('theme') ? localStorage.getItem('theme')! : 'light'
  //   );
  // }
  // setLang(): void {
  //   // this.cls.changeLang(
  //   //   localStorage.getItem('langCode')
  //   //     ? localStorage.getItem('langCode')!
  //   //     : 'en'
  //   // );
  // }
}
