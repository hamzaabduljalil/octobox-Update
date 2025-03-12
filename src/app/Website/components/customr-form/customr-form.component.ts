import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { City } from '../../../models/Interfaces/City';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CityService } from '../../../services/dataServices/city.service';
import { AreaService } from '../../../services/dataServices/area.service';
import { PackageTypeService } from '../../../services/dataServices/package-type.service';
import { Area } from '../../../models/Interfaces/Area';
import { PackageType } from '../../../models/Interfaces/PackageType';
import { SearchServiceService } from '../../services/search-service.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChangeLangService } from '../../../services/other/change-lang.service';
import { InputTextModule } from 'primeng/inputtext';
import { ToastService } from '../../../services/other/toast.service';
import { Coordinates } from '../../../models/Interfaces/Coordinates';
import { ShippingTypeService } from '../../../services/dataServices/shipping-type.service';
import { ShippingType } from '../../../models/Interfaces/ShippingType';
import { Service, ServiceDefault } from '../../../models/Interfaces/Service';
// import { ToastService } from '.../';
@Component({
  selector: 'app-customr-form',
  standalone: true,
  imports: [
    ButtonModule ,
    MultiSelectModule,
    FormsModule,
    DropdownModule,
    TranslateModule,
    InputTextModule
  ],
  templateUrl: './customr-form.component.html',
  styleUrl: './customr-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomrFormComponent {
  cityService = inject(CityService);
  toastService = inject(ToastService);
  areaService = inject(AreaService);
  packageTypeService = inject(PackageTypeService); 
  searchService = inject(SearchServiceService);
  cls = inject(ChangeLangService)
  cities = signal<City[]>([])
  selectedDestCity: City;
  selectedpickCity: City;
  pickareas = signal<Area[]>([])
  destareas = signal<Area[]>([])
  selectedDestArea: Area | null;
  selectedpickArea: Area | null;
  packageTypes = signal<PackageType[]>([])
  selectedPackage: PackageType;
  weight;
  length
  height
  width
  dimension = 0
  translate = inject(TranslateService);
  cd = inject(ChangeDetectorRef);
  shippingService = inject(ShippingTypeService)
  shippingTypes = signal<ShippingType[]>([]);
  lang : string = "en" ;
  shippingTypeId = ''

  ngOnInit(): void {
    this.getData();
    this.getShippingType();
  }

  

  getShippingType(){
    this.shippingService.getShippingTypes()
    .subscribe({
      next: (value) => {
        this.shippingTypes.set(value);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  getData() {
    this.cityService.get({}).subscribe({
      next: (value) => {
        this.cities.set(value) ;
        if (this.searchService.result) {
          this.selectedDestCity = this.searchService.data.destCity;
          this.selectedpickCity = this.searchService.data.pickCity;
          this.width = this.searchService.data.weight
          this.length = this.searchService.data.length
          this.height = this.searchService.data.height
          this.loadAreasForSelectedCities();
        }
      },
      error: (e) => {
        console.log(e);
      }
    });

    this.packageTypeService.get({}).subscribe({
      next: (value) => {
        this.packageTypes.set(value) ;
        if (this.searchService.result) {
          this.selectedPackage = this.searchService.data.packageType;
          this.weight = this.searchService.data.weight;
          this.dimension = this.searchService.data.dimension;
        }
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  private loadAreasForSelectedCities() {
    if (this.selectedpickCity) {
      const pickupCityArray = [this.selectedpickCity.id];
      console.log(pickupCityArray , 'pickupCityArray');
      // return
      this.areaService.getAreasByCities(pickupCityArray).subscribe({
        next: (value) => {
          for (const area of value) {
            this.pickareas.set(area.areas) ;
          }
          if (this.searchService.data.pickArea) {
            this.selectedpickArea = this.searchService.data.pickArea;
          }
        },
        error: (e) => console.log(e)
      });
    }

    if (this.selectedDestCity) {
      const destCityArray = [this.selectedDestCity.id];
      console.log(destCityArray , 'destCityArray');
      this.areaService.getAreasByCities(destCityArray).subscribe({
        next: (value) => {
          for (const area of value) {
            this.destareas.set(area.areas);
          }
          if (this.searchService.data.destArea) {
            this.selectedDestArea = this.searchService.data.destArea;
          }
        },
        error: (e) => console.log(e)
      });
    }
  }

  onpickCityCahnge(e) {
      const city = e.value;
    const cityArray = [city];
    console.log(cityArray , 'cityArray');
    const citiesIds = cityArray.map(city => city.id);
    console.log(citiesIds , 'citiesIds');
    this.areaService.getAreasByCities(citiesIds).subscribe({
      next: (value) => {
        for (const area of value) {
          this.pickareas.set(area.areas);
        }
        this.selectedpickArea = null; 
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  ondestCityCahnge(e) {
    const city = e.value;
    const cityArray = [city];
    const citiesIds = cityArray.map(city => city.id);
    this.areaService.getAreasByCities(citiesIds).subscribe({
      next: (value) => {
        for (const area of value) {
          this.destareas.set(area.areas);
        }
        this.selectedDestArea = null; 
      },
      error: (e) => {
        console.log(e);
      }
    });
  };

  OnSubmitClick(){
    this.dimension = this.width * this.height * this.length
    console.log(this.dimension , 'dimension');
    
    const data = {
      destCity: this.selectedDestCity,
      pickCity: this.selectedpickCity,
      destArea: this.selectedDestArea,
      destAreas: this.destareas,
      pickareas: this.pickareas,
      pickArea: this.selectedpickArea,
      packageType: this.selectedPackage,
      weight: this.weight,
      width: this.width,
      height: this.height,
      length: this.length
    }
    this.searchService.data = data;
    // console.log('dest area' + JSON.stringify(this.selectedDestArea),
    //   'pick city' + JSON.stringify(this.selectedpickCity),
    //   'package'+this.selectedPackage,
    //   'pick area' + JSON.stringify(this.selectedpickArea),
    //   'dest city' + JSON.stringify(this.selectedDestCity),
    //   this.weight,
    //   this.dimension,
    // );

    // submit the form here.
    if (!this.weight|| 
       !this.dimension || 
       !this.selectedDestArea || 
       !this.selectedDestCity || 
       !this.selectedpickCity || 
       !this.selectedpickArea ||
       !this.selectedPackage
      ){
      const text = this.translate.instant('Please Fill All Fields')
        this.toastService.showToast_error(text);
    }else{
      const pickarea = this.selectedpickArea;
      const destarea = this.selectedDestArea;
      console.log(pickarea, destarea);
      const location : Coordinates[] = [];
      location.push({
        lon: pickarea?.coordinates?.lon,
        lat: pickarea?.coordinates?.lat
      });
      location.push({
        lon: destarea?.coordinates?.lon,
        lat: destarea?.coordinates?.lat
      });
      console.log(location);
      if (this.selectedDestCity.id === this.selectedpickCity.id) {
        this.shippingTypeId = this.shippingTypes().find(s => s.name.en === "internal").id;
        console.log(this.shippingTypeId , 'shippingTypeId');
        console.log("Internal");
        this.searchService.getServices(
          this.shippingTypeId,
          this.selectedDestCity.id,
          this.selectedpickCity.id,
          this.selectedDestArea.id,
          this.selectedpickArea.id,
          this.selectedPackage.id,
          this.weight,
          this.dimension,
          location
        )
      } else {
        console.log("External")
        this.shippingTypeId = this.shippingTypes().find(s => s.name.en === "External").id;
        console.log(this.shippingTypeId , 'shippingTypeId');
        this.searchService.getServices(
          this.shippingTypeId,
          this.selectedDestCity.id,
          this.selectedpickCity.id,
          this.selectedDestArea.id,
          this.selectedpickArea.id,
          this.selectedPackage.id,
          this.weight,
          this.dimension,
          location
        )
      }
    }
  }
}