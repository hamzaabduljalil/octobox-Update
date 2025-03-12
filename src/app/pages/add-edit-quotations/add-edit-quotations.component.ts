import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper'
import { AddEditQuotationsDialogComponent } from '../quotations/dialogs/add-edit-quotations-dialog/add-edit-quotations-dialog.component';
import { ServicePartTwoComponent } from "../quotations/dialogs/service-part-two/service-part-two.component";
import { FirstStepComponent } from "./components/first-step/first-step.component";
import { SecondStepComponent } from "./components/second-step/second-step.component";
import { ThirdStepComponent } from "./components/third-step/third-step.component";
import { ServiceService } from '../../services/dataServices/service.service';
import { ToastService } from '../../services/other/toast.service';
import { ServiceDefault } from '../../models/Interfaces/Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-quotations',
  standalone: true,
  imports: [
    ButtonModule,
    StepperModule,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent
],
  templateUrl: './add-edit-quotations.component.html',
  styleUrl: './add-edit-quotations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditQuotationsComponent {
  @ViewChild(ThirdStepComponent) thirdStep!: ThirdStepComponent;
  private serviceService = inject(ServiceService);
  private data = this.serviceService.data;
  toastService = inject(ToastService)
  router = inject(Router)

  isStepValid(step: number): boolean {
    let isValid = false;
    switch(step) {
      case 1:
        isValid = !!(
          this.data.name?.ar &&
          this.data.name?.en &&
          this.data.shippingType &&
          this.data.shippingCompany &&
          this.data.city?.length > 0 
        );
        break;
      
      case 2:
        isValid = !!(
          this.data.vehicle?.length > 0 &&
          this.data.packageType?.length > 0 &&
          this.data.from &&
          this.data.to &&
          this.data.minWeight &&
          this.data.maxWeight &&
          this.data.riskFees &&
          this.data.fuelFees &&
          this.data.maxLength &&
          this.data.maxHeight &&
          this.data.maxWidth
        );
        break;
    }
    
    console.log(`Step ${step} Validation:`, {
      isValid,
      data: this.data
    });
    
    return isValid;
  }

  isFormValid(): boolean {
    // Check all steps are valid
    const stepsValid = this.isStepValid(1) && this.isStepValid(2);
    
    // Check third step data (pricing) - at least one pricing method is required
    const pricingValid = !!(
      this.data.price?.length > 0 && // At least one pricing method selected
      this.data.price.some(price => 
        (price.code === 2 && price.range?.length > 0) || // For zones pricing
        (price.code !== 2 && price.price !== undefined) // For other pricing types
      )
    );

    console.log('Form Validation:', {
      stepsValid,
      pricingValid,
      priceData: this.data.price,
      allData: this.data
    });

    return stepsValid && pricingValid;
  }

  onPriceDataReady(priceData: any) {
    this.serviceService.data.price = priceData;
  }

  save() {
    console.log('save function is called');
    this.thirdStep.preparePriceData();
    
    this.serviceService.save(this.serviceService.data)
      .subscribe({
        next: (res => {
          console.log(res, 'createdSuccessfully')
          this.toastService.showToast_success()
          
          this.router.navigate(['/admin/services'])
          console.log(this.data , 'data after saving');
        }),
        error: (err) => {
          this.toastService.showToast_error(err);
        },
      },
    );
  }
}
