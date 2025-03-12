import { ChangeDetectionStrategy, Component, signal, inject, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { PricingMethodService } from '../../../../services/dataServices/pricing-method.service';
import { ChangeLangService } from '../../../../services/other/change-lang.service';
import { PricingMethod } from '../../../../models/Interfaces/PricingMethod';
import { ServiceService } from '../../../../services/dataServices/service.service';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService } from 'primeng/dynamicdialog';
import { AddRangeDialogComponent } from '../../../quotations/dialogs/add-range-dialog/add-range-dialog.component';
import { Range } from '../../../../models/Interfaces/Range';

@Component({
  selector: 'app-third-step',
  standalone: true,
  imports: [
    MultiSelectModule,
    ButtonModule,
    TranslateModule,
    FormsModule,
    InputTextModule
  ],
  templateUrl: './third-step.component.html',
  styleUrl: './third-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThirdStepComponent {
  @Output() priceData = new EventEmitter<any>();

  data = inject(ServiceService).data
  pricingService = inject(PricingMethodService);
  translate = inject(TranslateService);
  currentLang = inject(ChangeLangService).currentLang;
  dialogService = inject(DialogService)
  isZones = signal(false);
  selectedPricing: PricingMethod[] = [];
  rangesArray = signal<Range[]>([]);
  pricingTypes = signal<PricingMethod[]>([]);
  pricesArray: { [key: string]: number } = {};


  ngOnInit(){
    this.getData()
  }


  getData() {
    this.pricingService
      .get({
        withCount: true,
      })
      .subscribe({
        next: (
          value: { results: PricingMethod[]; count: number } | PricingMethod[]
        ) => {
          if (!Array.isArray(value)) {
            this.pricingTypes.set(value.results);
          }
          if (this.data.pricingMethod.length > 0) {
            this.selectedPricing = 
              this.pricingTypes().filter((price) => {
                return this.data.pricingMethod.some(
                  (p) => price.code === p.code
                );
              }
            );
            this.isZones.set(this.selectedPricing.some((p) => p.code === 2));
          }
          // if(this.dynamicDialogConfig.data.obj){
          //   this.pricesArray = this.dynamicDialogConfig.data.obj
          //   console.log(this.pricesArray , 'pricesArray');  
          // }
          // if (this.dynamicDialogConfig?.data?.obj && Array.isArray(this.dynamicDialogConfig.data.obj)) {
          //   this.dynamicDialogConfig.data.obj.forEach((price) => {
          //     if (price?.code !== undefined && price.code !== 2) {
          //       this.pricesArray[price.code.toString()] = price.price || 0;
          //     }
          //   });
          // } else {
          //   console.error("data.obj is undefined or not an array:", this.dynamicDialogConfig?.data?.obj);
          // }
          
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  changePricingMethod(event) {
    this.pricesArray = {};
    console.log(event.value);
    this.selectedPricing = ([...event.value]);
    console.log(this.selectedPricing , 'selectedPricing');
    this.isZones.set(this.selectedPricing.some((val) => val.code === 2));
    if (!this.isZones) {
      this.rangesArray.set([]); 
    }
  }

  openRangeDialog() {
    const headerText = this.translate.instant("Add Range");
    const dialog = this.dialogService.open(AddRangeDialogComponent, {
      header: headerText,
      footer: ".",
      width: "600px",
      rtl: true,
    });
    dialog.onClose.subscribe((result) => {
      console.log("Dialog closed", result);
      const range = result;
      this.rangesArray.set([...this.rangesArray(),range]);
      console.log(this.rangesArray() , 'Array Of Ranges');
    });
  }

  preparePriceData() {
    console.log('functios is called');
    
    const result = [];
    const name = this.selectedPricing.map((p) => p);
    for (const n of name) {
      if (this.rangesArray().length > 0 && n.code === 2) {
        result.push({
          type: n.name,
          code: n.code,
          range: this.rangesArray(),
        }); 
      } else {
        result.push({
          type: n.name,
          code: n.code,
          price: this.pricesArray[n.code.toString()],
        });
      }
    }
    this.data.price = result;
    console.log(result ,'result');
    this.priceData.emit(result);
  }
}
  

