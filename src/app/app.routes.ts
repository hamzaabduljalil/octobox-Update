import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', // Root route
    title: 'Home',
    loadComponent: () =>
      import('./Website/pages/addresses/addresses.component').then(
        (m) => m.AddressesComponent
      ),
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
    title: 'Saved Package',
    loadComponent: () =>
      import('./Website/pages/saved-packages/saved-packages.component').then(
        (m) => m.SavedPackagesComponent
      ),
  },
  {
    path: 'save-address',
    title: 'Saved Address',
    loadComponent: () =>
      import('./Website/pages/saved-address/saved-address.component').then(
        (m) => m.SavedAddressComponent
      ),
  },
  // Optional: Add a login route if relevant to your app
  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('./Website/pages/addresses/addresses.component').then(
        (m) => m.AddressesComponent // Replace with your actual login component
      ),
  },
  // Explicit not-found route
  {
    path: 'not-found',
    title: 'Not Found',
    loadComponent: () =>
      import('./Website/pages/addresses/addresses.component').then(
        (m) => m.AddressesComponent // Replace with your actual not-found component
      ),
  },
  // Wildcard route to handle unknown paths
  { path: '**', redirectTo: 'not-found' }, // Redirects to 'not-found' instead of 'addresses'
];
