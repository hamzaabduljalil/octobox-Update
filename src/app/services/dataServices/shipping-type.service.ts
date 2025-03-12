import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SharedVarsService } from "../other/shared-vars.service";
import { ShippingType } from "../../models/Interfaces/ShippingType";

@Injectable({
  providedIn: "root",
})
export class ShippingTypeService {
  http = inject(HttpClient);
  sharedVarService = inject(SharedVarsService);
  baseURL = this.sharedVarService.baseURL;
  getShippingTypes(): Observable<ShippingType[]> {
    return this.http.get<ShippingType[]>(
      this.baseURL + "/shipping-type"
    );
  }
}
