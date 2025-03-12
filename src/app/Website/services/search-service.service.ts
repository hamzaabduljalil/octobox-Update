import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedVarsService } from '../../services/other/shared-vars.service';
import { MultiLangs } from '../../models/Interfaces/MultiLangs';
import { ToastService } from '../../services/other/toast.service';
@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  http = inject(HttpClient);
  router = inject(Router);
  sharedVarService = inject(SharedVarsService);
  baseURL = this.sharedVarService.baseURL;
  result;
  data;
  getServices(shippingType: string, destCity: string,
    pickCity: string, destArea: string, pickArea: string,
    packageType: string, weight: number, dimension: number, location: any
  ) {
    return this.http.post(this.baseURL + "/service-client/search", {
      shippingType,
      destCity,
      pickCity,
      destArea,
      pickArea,
      packageType,
      weight, dimension, location
    }).subscribe({
      next: (value) => {
        console.log(value);
        this.result = value;
        this.router.navigate(['customer/showServices']);
      },
      error: (err) => {
        console.log(err);
       this.router.navigate(['customer/showServices'])
       this.result = []
      }
    })
  }
}
