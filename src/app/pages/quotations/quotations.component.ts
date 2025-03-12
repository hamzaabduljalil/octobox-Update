import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, finalize, switchMap } from 'rxjs';
import { AddEditQuotationsDialogComponent } from './dialogs/add-edit-quotations-dialog/add-edit-quotations-dialog.component';
import { ServiceService } from '../../services/dataServices/service.service';
import { Vehicle } from '../../models/Interfaces/Vehicle';
import { City } from '../../models/Interfaces/City';
import { PricingMethod } from '../../models/Interfaces/PricingMethod';
import { Service, ServiceDefault } from '../../models/Interfaces/Service';
import { Area } from '../../models/Interfaces/Area';
import { PackageType } from '../../models/Interfaces/PackageType';
import { Company } from '../../models/Interfaces/Company';
import { ChangeLangService } from '../../services/other/change-lang.service';
import { deepMergeAndOverwrite } from '../../services/other/staticFunctions';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../services/other/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotations',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule,
    SkeletonModule,
    DialogModule,
    ButtonModule,
    CheckboxModule,
    OverlayPanelModule,
    TranslateModule,
    InputTextModule,
    ButtonGroupModule,
  ],
  templateUrl: './quotations.component.html',
  styleUrl: './quotations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotationsComponent {
  loading = signal(false);
  dynamicDialogRef: DynamicDialogRef | undefined;
  confirnationService = inject(ConfirmationService);
  toastService = inject(ToastService);
  dialogService = inject(DialogService);
  router = inject(Router);
  tr = inject(TranslateService);
  cls = inject(ChangeLangService);
  dataService = inject(ServiceService);
  paginationState = new BehaviorSubject<PaginatorState>({
    page: 0,
    rows: 15,
    first: 0,
  });
  objs = signal<Service[]>([]);
  newService: Service = ServiceDefault;
  first = 0;
  count = signal(0);
  searchValue = '';

  cols = [
    { field: 'name', header: 'Service Name' },
    { field: 'shippingType', header: 'Shipping Type' },
    { field: 'city', header: 'City' },
    { field: 'shippingCompany', header: 'Company' },
    { field: 'price', header: 'Price Type' },
    { field: 'from', header: 'From' },
    { field: 'to', header: 'To' },
    { field: 'area', header: 'Area' },
    { field: 'maxDimension', header: 'Max Dimension' },
    { field: 'maxWeight', header: 'Max Weight' },
    { field: 'minWeight', header: 'Min Weight' },
    { field: 'packageType', header: 'PackageType' },
    { field: 'vehicle', header: 'Vehicle' },
    { field: 'fuelFees', header: 'Fuel Fees' },
    { field: 'riskFees', header: 'Risk Fees' },
    { field: 'actions', header: 'Actions' },
  ];
  getFormattedValue(rowData: any, field: string): string {
    switch (field) {
      case 'city':
        return this.cls.currentLang() === 'ar'
          ? rowData.city?.map((city: City) => city?.name?.ar)
          : rowData.city?.map((city: City) => city?.name?.en) || '';
      case 'shippingType':
        return this.cls.currentLang() === 'ar'
          ? rowData.shippingType?.name?.ar
          : rowData.shippingType?.name?.en || '';
      case 'shippingCompany':
        return this.cls.currentLang() === 'ar'
          ? rowData.shippingCompany?.name?.ar
          : rowData.shippingCompany?.name?.en || '';
      case 'price':
        return this.cls.currentLang() === 'ar'
          ? rowData.price?.map((p: { type: { ar: string } }) => p.type?.ar)
          : rowData.price?.map((p: { type: { en: string } }) => p.type?.en) ||
              '';
      case 'area':
        return this.cls.currentLang() === 'ar'
          ? rowData.area?.map((area: Area) => area.name?.ar)
          : rowData.area?.map((area: Area) => area.name?.en) || '';
      case 'vehicle':
        return this.cls.currentLang() === 'ar'
          ? rowData.vehicle?.map((vehicle: Vehicle) => vehicle.name?.ar)
          : rowData.vehicle?.map((vehicle: Vehicle) => vehicle.name?.en) || '';
      case 'packageType':
        return this.cls.currentLang() === 'ar'
          ? rowData.packageType?.map(
              (packageType: PackageType) => packageType.name?.ar
            )
          : rowData.packageType?.map(
              (packageType: PackageType) => packageType.name?.en
            ) || '';
      case 'name':
        return this.cls.currentLang() === 'ar'
          ? rowData.name?.ar
          : rowData.name?.en || '';
      case 'riskFees':
        return rowData.riskFees.toString() + '$' || '';
      case 'fuelFees':
        return rowData.fuelFees.toString() + '$' || '';
      default:
        return rowData[field]?.toString() || '';
    }
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.paginationState
      .pipe(
        switchMap((event: PaginatorState) => {
          this.objs.set([]);
          this.count.set(0);
          this.loading.set(true);

          const data = {
            skip: event.page!,
            limit: event.rows!,
            withCount: true,
            searchValue: this.searchValue,
            sortKey: 'createdAt',
            sortOrder: -1,
          };

          return this.dataService.get(data).pipe(
            finalize(() => {
              this.loading.set(false);
            })
          );
        })
      )
      .subscribe({
        next: (res: { results: Service[]; count: number } | Service[]) => {
          if (!Array.isArray(res)) {
            this.objs.set(res.results);
            this.count.set(res.count);
          }
          console.log(this.objs(), 'objs');
        },
      });
  }

  onPageChange(event: PaginatorState) {
    this.paginationState.next(event);
  }

  addService() {
    this.router.navigate(['/admin/services/add']);
  }

  openDialog(obj?: Service) {
    const cloneObject = JSON.parse(JSON.stringify(obj ? obj : ServiceDefault));
    //   ? Tag.fromJSON(JSON.parse(JSON.stringify(obj.toPlainObject()))) // Deep clone and rehydrate
    //   : new Tag();
    // console.log(ServiceDefault , 'default');

    const dialog = this.dialogService.open(AddEditQuotationsDialogComponent, {
      header: this.tr.instant(obj ? 'Edit' : 'Add'),
      footer: '.',
      width: '600px',
      data: { obj: cloneObject },
      closeOnEscape: false,
      style: {
        direction: this.cls.currentDirection(),
      },
      modal: true,
      closable: true,
    });

    dialog.onClose.subscribe((object) => {
      if (object) {
        if (obj) {
          const updatedObjs = this.objs().map((o) =>
            o.id === obj.id ? object : o
          );

          this.objs.set(updatedObjs);
        } else {
          this.objs.set([{ ...cloneObject, id: object.id }, ...this.objs()]);
          this.count.set(this.count() + 1);
        }
      }
    });
  }

  delete(obj: Service, index: number) {
    this.confirnationService.confirm({
      header: this.tr.instant('Delete'),
      message: this.tr.instant('Delete This Row'),
      icon: 'fa-solid fa-trash-can fa-2xl',
      // acceptButtonProps: {
      //   label: this.tr.instant("Delete"),
      //   severity: "danger",
      //   outlined: true,
      // },
      // rejectButtonProps: {
      //   label: this.tr.instant("Cancel"),
      //   severity: "secondary",
      //   outlined: true,
      // },
      accept: () => {
        if (obj.id) {
          this.dataService.delete(obj.id).subscribe({
            next: () => {
              this.count.set(this.count() - 1);
              this.objs().splice(index, 1);
              this.toastService.showToast(
                'success',
                '',
                this.tr.instant('Deleted Successfully')
              );
              this.getData();
            },
          });
        }
      },
    });
  }
}
