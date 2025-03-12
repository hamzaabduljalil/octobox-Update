import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ShippingCompanyService } from '../../../../services/dataServices/shipping-company.service';
import { CityService } from '../../../../services/dataServices/city.service';
import { Service, ServiceDefault } from '../../../../models/Interfaces/Service';
import { Company } from '../../../../models/Interfaces/Company';
import { City } from '../../../../models/Interfaces/City';
import { ChangeLangService } from '../../../../services/other/change-lang.service';
import { ShippingType } from '../../../../models/Interfaces/ShippingType';
import { ShippingTypeService } from '../../../../services/dataServices/shipping-type.service';
import { AreaService } from '../../../../services/dataServices/area.service';
import { CityArea } from '../../../../models/Interfaces/CityArea';
import { Area } from '../../../../models/Interfaces/Area';
import { ServiceService } from '../../../../services/dataServices/service.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-first-step',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    TranslateModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
  ],
  templateUrl: './first-step.component.html',
  styleUrl: './first-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstStepComponent {
  data = inject(ServiceService).data;
  companyService = inject(ShippingCompanyService);
  cityService = inject(CityService);
  typeService = inject(ShippingTypeService);
  areaService = inject(AreaService);
  currentLang = inject(ChangeLangService).currentLang;
  companies = signal<Company[]>([]);
  cities = signal<City[]>([]);
  selectedCities: City[] = [];
  types = signal<ShippingType[]>([]);
  areasByCities = signal<CityArea[]>([]);

  citiesIds: string[] = [];
  saving = false;

  ngOnInit() {
    console.log(this.data, 'data Initialized');
    this.getData();

    // Restore previously selected cities and areas if available
    if (this.data.cityArea && this.data.cityArea.length > 0) {
      this.areasByCities.set(this.data.cityArea);
    } else if (this.data.city && this.data.city.length > 0) {
      // If we have cities selected but no cityArea data, fetch the areas
      this.onCitiesChange();
    }
  }

  getData() {
    const data = {
      sortKey: 'createdAt',
      sortOrder: -1,
    };

    this.typeService.getShippingTypes().subscribe({
      next: (res) => {
        this.types.set(res);
      },
    });

    this.companyService.get(data).subscribe({
      next: (res) => {
        this.companies.set(res);
      },
    });

    this.cityService.get(data).subscribe({
      next: (res) => {
        this.cities.set(res);
      },
    });
  }

  onCitiesChange() {
    if (this.data.city && this.data.city.length > 0) {
      const selectedCities = this.data.city;
      this.citiesIds = selectedCities
        .map((city) => city.id)
        .filter((id): id is string => id !== undefined);

      this.areaService.getAreasByCities(this.citiesIds).subscribe({
        next: (res) => {
          // If we have existing cityArea data with selections
          if (this.data.cityArea && this.data.cityArea.length > 0) {
            // Map existing selections to the new cityArea data
            const areasWithSelection = res.map((cityArea) => {
              const existingCityArea = this.data.cityArea?.find(
                (ca) => ca.city.id === cityArea.city.id
              );
              return {
                ...cityArea,
                selectedAreas: existingCityArea
                  ? existingCityArea.selectedAreas
                  : [],
              };
            });
            this.areasByCities.set(areasWithSelection);
          } else {
            // No existing selections, initialize with empty selections
            const areasWithSelection = res.map((cityArea) => ({
              ...cityArea,
              selectedAreas: [],
            }));
            this.areasByCities.set(areasWithSelection);
          }

          console.log(this.areasByCities(), 'areas');
        },
      });
    } else {
      this.areasByCities.set([]);
    }
  }

  ngOnDestroy() {
    // Save the selected cities and areas when component is destroyed
    this.data.cityArea = this.areasByCities();

    // Update the data.area with all selected areas from all cities
    const allSelectedAreas = this.areasByCities().flatMap(
      (cityArea) => cityArea.selectedAreas || []
    );

    this.data.area = allSelectedAreas;

    console.log(this.data, 'Service After Destroy');
  }
}
