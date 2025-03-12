import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomMenuItem } from '../../../models/Interfaces/CustomMenuItem';
import { ChangeLangService } from '../../../services/other/change-lang.service';
import { StateService } from '../../../services/other/state.service';
import { SwitchThemeService } from '../../../services/other/switch-theme.service';
import { ToastService } from '../../../services/other/toast.service';
import { sidebaranimation } from '../../../animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [sidebaranimation],
})
export class SidebarComponent implements OnInit {
  themeService = inject(SwitchThemeService);
  changelangService = inject(ChangeLangService);
  stateService = inject(StateService);
  toastService = inject(ToastService);
  cd = inject(ChangeDetectorRef);
  translateService = inject(TranslateService);
  router = inject(Router);

  menuItems: CustomMenuItem[] = [
    {
      id: 'Company',
      icon: 'pi pi-building',
      title: this.translateService.instant('Shipping Company'),
      routerLink: '/admin/company',
    },
    {
      id: 'City',
      icon: 'pi pi-map-marker',
      title: this.translateService.instant('City'),
      routerLink: '/admin/city',
    },
    {
      id: 'Area',
      icon: 'pi pi-globe',
      title: this.translateService.instant('Area'),
      routerLink: '/admin/area',
    },
    {
      id: 'packageType',
      icon: 'pi pi-box',
      title: this.translateService.instant('PackageType'),
      routerLink: '/admin/packageType',
    },
    {
      id: 'PricingMethod',
      icon: 'pi pi-dollar',
      title: this.translateService.instant('Pricing Method'),
      routerLink: '/admin/pricingMethod',
    },
    {
      id: 'VehicleType',
      icon: 'pi pi-car',
      title: this.translateService.instant('Vehicle Type'),
      routerLink: '/admin/vehicleType',
    },
    {
      id: 'Services',
      icon: 'pi pi-briefcase',
      title: this.translateService.instant('Services'),
      routerLink: '/admin/services',
    },
  ];

  dir = localStorage.getItem('direction');
  langCode = localStorage.getItem('langCode');
  currentTheme = localStorage.getItem('theme');

  closeCallback(event: any): void {
    console.log(event);
  }

  isSubMenuOpen: any = {};

  toggleSubMenu(id: string) {
    this.isSubMenuOpen[id]
      ? delete this.isSubMenuOpen[id]
      : (this.isSubMenuOpen[id] = true);
  }

  ngOnInit(): void {
    this.currentTheme = localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : 'light';
  }

  changeLang(lang: string): void {
    this.changelangService.changeLang(lang);
  }

  swwitchTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    this.themeService.switchTheme(theme);
    this.currentTheme = theme;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('name');
    this.router.navigate(['/login']);
  }

  toggleArrowDirection(id: string) {
    this.isSubMenuOpen[id]
      ? delete this.isSubMenuOpen[id]
      : (this.isSubMenuOpen[id] = true);
  }
}
