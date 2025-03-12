import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  PLATFORM_ID,
  computed,
  signal,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeLangService {
  private lang: string | '' = '';
  private isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private translateSerivce: TranslateService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  position = signal('left');
  currentLang = signal(
    this.isBrowser && localStorage.getItem('lang')
      ? localStorage.getItem('lang')
      : 'en'
  );
  currentDirection = computed(() => {
    if (this.currentLang() === 'en') {
      this.translateSerivce.use(this.currentLang()!);
      return 'ltr';
    } else if (this.currentLang() === 'ar') {
      this.translateSerivce.use(this.currentLang()!);
      return 'rtl';
    } else return '';
  });

  changeLang(langCode: string): void {
    if (this.isBrowser) {
      localStorage.setItem('langCode', langCode.toString());
    }
    if (langCode === 'ar') {
      this.currentLang.set('ar');
    } else {
      this.currentLang.set('en');
    }
  }
}
