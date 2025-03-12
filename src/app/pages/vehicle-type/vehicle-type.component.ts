import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { BehaviorSubject, finalize, switchMap } from 'rxjs';
import { Vehicle, VehicleDefault } from '../../models/Interfaces/Vehicle';
import { VehicleTypeService } from '../../services/dataServices/vehicle-type.service';
import { ChangeLangService } from '../../services/other/change-lang.service';
import { deepMergeAndOverwrite } from '../../services/other/staticFunctions';
import { ToastService } from '../../services/other/toast.service';
import { AddEditVehicleComponent } from './dialogs/add-edit-vehicle/add-edit-vehicle.component';

@Component({
  selector: 'app-vehicle-type',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule,
    TranslateModule,
    SkeletonModule,
    DialogModule,
    ButtonModule,
    CheckboxModule,
    OverlayPanelModule,
    InputTextModule,
    ButtonGroupModule,
  ],
  templateUrl: './vehicle-type.component.html',
  styleUrl: './vehicle-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleTypeComponent {
  confirmationService = inject(ConfirmationService);
  dialogService = inject(DialogService);
  http = inject(HttpClient);
  messageService = inject(MessageService);

  dataService = inject(VehicleTypeService);
  toastService = inject(ToastService);
  cls = inject(ChangeLangService);
  tr = inject(TranslateService);
  currentLang = inject(ChangeLangService).currentLang;

  loading = signal(false);
  count = signal(0);

  objs = signal<Vehicle[]>([]);

  selectedObj: Vehicle | null = null;
  searchValue = '';
  cols = [
    { field: 'name', header: 'Name' },
    { field: 'processes', header: 'Processes' },
  ];
  paginationState = new BehaviorSubject<PaginatorState>({
    page: 0,
    rows: 25,
  });

  ngOnInit(): void {
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
        next: (res: { results: Vehicle[]; count: number } | Vehicle[]) => {
          if (!Array.isArray(res)) {
            console.log(res.results);
            this.objs.set(res.results);
            this.count.set(res.count);
          }
        },
      });
  }

  refresh() {
    this.getData();
  }

  onPageChange(event: PaginatorState) {
    this.paginationState.next(event);
  }

  openDialog(obj?: Vehicle) {
    const cloneObject = JSON.parse(JSON.stringify(obj ? obj : VehicleDefault));

    const dialog = this.dialogService.open(AddEditVehicleComponent, {
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

  delete(obj: Vehicle, index: number) {
    this.confirmationService.confirm({
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
          this.dataService.delete(obj.id!).subscribe({
            next: () => {
              this.count.set(this.count() - 1);
              this.objs().splice(index, 1);
              this.getData();
              this.toastService.showToast(
                'success',
                '',
                this.tr.instant('Deleted Successfully')
              );
            },
          });
        }
      },
    });
  }
}
