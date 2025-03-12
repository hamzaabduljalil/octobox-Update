import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

// import { SwitchThemeService } from './services/other/switch-theme.service';
// import { StateService } from './services/other/state.service';
// import { ChangeLangService } from './services/other/change-lang.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // primengConfig = inject(PrimeNGConfig);

  // themeService = inject(SwitchThemeService);
  // stateService = inject(StateService);
  // cls = inject(ChangeLangService);

  ngOnInit(): void {
    this.setTheme();
    this.setLang();
  }

  setTheme() {
    // this.themeService.switchTheme(localStorage.getItem('theme') ?? 'light');
  }

  setLang(): void {
    // this.cls.changeLang(localStorage.getItem('langCode') ?? 'en');
  }
}
