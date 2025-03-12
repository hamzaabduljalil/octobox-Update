import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { PricingMethod } from '../../../../models/Interfaces/PricingMethod';
import { PricingMethodService } from '../../../../services/dataServices/pricing-method.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AddRangeDialogComponent } from '../add-range-dialog/add-range-dialog.component';
import { Range } from '../../../../models/Interfaces/Range';
import { InputTextModule } from 'primeng/inputtext';
import { ChangeLangService } from '../../../../services/other/change-lang.service';

@Component({
  selector: 'app-choose-pricing',
  standalone: true,
  imports: [
    MultiSelectModule,
    ButtonModule,
    FormsModule,
    TranslateModule,
    InputTextModule,
  ],
  templateUrl: './choose-pricing.component.html',
  styleUrl: './choose-pricing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoosePricingComponent {
  pricingService = inject(PricingMethodService);
  dynamicDialogRef = inject(DynamicDialogRef);
  dialogService = inject(DialogService);
  translate = inject(TranslateService);
  currentLang = inject(ChangeLangService).currentLang;
  isZones = signal(false);
  selectedPricing: PricingMethod[] = [];
  rangesArray = signal<Range[]>([]);
  pricingTypes = signal<PricingMethod[]>([]);
  dynamicDialogConfig = inject(DynamicDialogConfig);
  pricesArray: { [key: string]: number } = {};

  ngOnInit(): void {
    console.log(this.dynamicDialogConfig.data.obj, 'Pricing Object');
    this.getData();
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
          if (this.dynamicDialogConfig.data?.obj) {
            this.selectedPricing = this.pricingTypes().filter((price) => {
              return this.dynamicDialogConfig.data?.obj.some(
                (p: PricingMethod) => price.code === p.code
              );
            });
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

  changePricingMethod(event: { value: PricingMethod[] }): void {
    this.pricesArray = {};
    console.log(event.value);
    this.selectedPricing = [...event.value];
    console.log(this.selectedPricing, 'selectedPricing');
    this.isZones.set(
      this.selectedPricing.some((val: PricingMethod) => val.code === 2)
    );
    if (!this.isZones) {
      this.rangesArray.set([]);
    }
  }

  openRangeDialog() {
    const headerText = this.translate.instant('Add Range');
    const dialog = this.dialogService.open(AddRangeDialogComponent, {
      header: headerText,
      footer: '.',
      width: '600px',
      rtl: true,
    });
    dialog.onClose.subscribe((result) => {
      console.log('Dialog closed', result);
      const range = result;
      this.rangesArray().push(range);
      console.log(this.rangesArray(), 'Array Of Ranges');
    });
  }

  save() {
    console.log(
      'pricesarray' + JSON.stringify(this.pricesArray),
      this.rangesArray
    );

    const result = [];
    const name = this.selectedPricing.map((p) => p);
    console.log(name, 'name');
    for (const n of name) {
      console.log(n, 'n');
      if (this.rangesArray().length > 0 && n.code === 2) {
        result.push({
          type: n.name,
          code: n.code,
          range: this.rangesArray(),
        });
        console.log(result, 'rangeResult');
      } else {
        result.push({
          type: n.name,
          code: n.code,
          price: this.pricesArray[n.code.toString()],
        });
      }
    }
    console.log(result, ' result');
    this.dynamicDialogRef.close(result);
  }
}
