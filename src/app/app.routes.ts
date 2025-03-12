import { Routes } from '@angular/router';
import { authGuardGuard } from './services/guards/auth-guard.guard';

export const routes: Routes = [
  {
    canActivate: [authGuardGuard],
    path: 'admin',
    loadComponent: () =>
      import('./components/layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'company',
        pathMatch: 'full',
      },
      {
        path: 'company',
        title: 'company',
        loadComponent: () =>
          import('./pages/company/company.component').then(
            (m) => m.CompanyComponent
          ),
      },
      {
        path: 'city',
        title: 'city',
        loadComponent: () =>
          import('./pages/city/city.component').then((m) => m.CityComponent),
      },
      {
        path: 'area',
        title: 'area',
        loadComponent: () =>
          import('./pages/area/area.component').then((m) => m.AreaComponent),
      },
      {
        path: 'packageType',
        title: 'packageType',
        loadComponent: () =>
          import('./pages/packagetype/packagetype.component').then(
            (m) => m.PackagetypeComponent
          ),
      },
      {
        path: 'pricingMethod',
        title: 'pricingMethod',
        loadComponent: () =>
          import('./pages/pricing-method/pricing-method.component').then(
            (m) => m.PricingMethodComponent
          ),
      },
      {
        path: 'vehicleType',
        title: 'vehicleType',
        loadComponent: () =>
          import('./pages/vehicle-type/vehicle-type.component').then(
            (m) => m.VehicleTypeComponent
          ),
      },
      {
        path: 'services',
        title: 'services',
        loadComponent: () =>
          import('./pages/quotations/quotations.component').then(
            (m) => m.QuotationsComponent
          ),
      },
      {
        path: 'services/add',
        title: 'add-service',
        loadComponent: () =>
          import(
            './pages/add-edit-quotations/add-edit-quotations.component'
          ).then((m) => m.AddEditQuotationsComponent),
      },
    ],
  },
  {
    path: 'customer',
    loadComponent: () =>
      import('./Website/pages/customr-service/customr-service.component').then(
        (m) => m.CustomrServiceComponent
      ),
    children: [
      {
        path: 'form',
        title: 'form',
        loadComponent: () =>
          import(
            './Website/components/customr-form/customr-form.component'
          ).then((m) => m.CustomrFormComponent),
      },
      {
        path: 'addresses',
        title: 'Addresses',
        loadComponent: () =>
          import('./Website/pages/addresses/addresses.component').then(
            (m) => m.AddressesComponent
          ),
      },
      {
        path: 'second',
        title: 'Second Form',
        loadComponent: () =>
          import('./Website/pages/second-form/second-form.component').then(
            (m) => m.SecondFormComponent
          ),
      },
      {
        path: 'save-package',
        title: 'Second Form',
        loadComponent: () =>
          import(
            './Website/pages/saved-packages/saved-packages.component'
          ).then((m) => m.SavedPackagesComponent),
      },
      {
        path: 'save-address',
        title: 'Second Form',
        loadComponent: () =>
          import('./Website/pages/saved-address/saved-address.component').then(
            (m) => m.SavedAddressComponent
          ),
      },
      {
        path: '',
        redirectTo: 'addresses',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    title: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'not-found',
    title: 'notFound',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  {
    path: '**',
    title: 'notFound',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
