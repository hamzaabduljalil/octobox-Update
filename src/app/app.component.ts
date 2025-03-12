import { Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// import { SwitchThemeService } from './services/other/switch-theme.service';
// import { StateService } from './services/other/state.service';
// import { ChangeLangService } from './services/other/change-lang.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // primengConfig = inject(PrimeNGConfig);

  // themeService = inject(SwitchThemeService);
  // stateService = inject(StateService);
  // cls = inject(ChangeLangService);

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      document.title = 'My Angular App';
      document.documentElement.style.fontSize = '11px'; // Ensure document is available before accessing it
      this.setTheme();
      this.setLang();
    }
  }

  setTheme() {
    // this.themeService.switchTheme(localStorage.getItem('theme') ?? 'light');
  }

  setLang(): void {
    // this.cls.changeLang(localStorage.getItem('langCode') ?? 'en');
  }
}
