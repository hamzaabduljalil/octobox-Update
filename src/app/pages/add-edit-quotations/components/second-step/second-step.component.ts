import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { VehicleTypeService } from '../../../../services/dataServices/vehicle-type.service';
import { PackageTypeService } from '../../../../services/dataServices/package-type.service';
import { ChangeLangService } from '../../../../services/other/change-lang.service';
import { TranslateModule } from '@ngx-translate/core';
import { Vehicle } from '../../../../models/Interfaces/Vehicle';
import { PackageType } from '../../../../models/Interfaces/PackageType';
import { ServiceService } from '../../../../services/dataServices/service.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Service, ServiceDefault } from '../../../../models/Interfaces/Service';

@Component({
  selector: 'app-second-step',
  standalone: true,
  imports: [
    MultiSelectModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    InputTextModule


  ],
  templateUrl: './second-step.component.html',
  styleUrl: './second-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondStepComponent {
  data = inject(ServiceService).data
  vheicleService = inject(VehicleTypeService)
  typeService = inject(PackageTypeService)
  currentLang = inject(ChangeLangService).currentLang
  vehicles = signal<Vehicle[]>([])
  selectedVehicles:Vehicle[] = []
  types = signal<PackageType[]>([])
  selectedTypes:PackageType[] = []

  saving = false

  ngOnInit(){
    console.log(this.data , 'data');
    this.getData()
  }

  getData(){
    const data = {
      sortKey:'createdAt',
      sortOrder:-1
    }
    this.typeService.get(data)
    .subscribe({
      next:(res => {
        this.types.set(res)
      })
    })

    this.vheicleService.get(data)
    .subscribe({
      next:(res => {
        this.vehicles.set(res)
      })
    })
  }

  ngOnDestroy(){
    const maxDimansion = this.data.maxHeight * this.data.maxLength * this.data.maxWidth
    this.data.maxDimension = maxDimansion
    console.log(this.data , 'Data');
  }
}
