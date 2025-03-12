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
import { AddEditAreaDialogComponent } from './dialogs/add-edit-area-dialog/add-edit-area-dialog.component';
import { AreaService } from '../../services/dataServices/area.service';
import { Area, AreaDefault } from '../../models/Interfaces/Area';
import { deepMergeAndOverwrite } from '../../services/other/staticFunctions';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../services/other/toast.service';
import { ChangeLangService } from '../../services/other/change-lang.service';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule,
    SkeletonModule,
    DialogModule,
    ButtonModule,
    TranslateModule,
    InputTextModule,
    ButtonGroupModule,
  ],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaComponent {
  confirmationService = inject(ConfirmationService);
  dialogService = inject(DialogService);
  http = inject(HttpClient);
  messageService = inject(MessageService);

  dataService = inject(AreaService);
  toastService = inject(ToastService);
  cls = inject(ChangeLangService);
  tr = inject(TranslateService);
  currentLang = inject(ChangeLangService).currentLang;

  loading = signal(false);
  count = signal(0);

  objs = signal<Area[]>([]);

  selectedObj: Area | null = null;
  dynamicDialogRef: DynamicDialogRef | undefined;
  searchValue = '';
  cols = [
    { field: 'name', header: 'Name' },
    { field: 'city', header: 'City' },
    { field: 'processes', header: 'Processes' },
  ];
  paginationState = new BehaviorSubject<PaginatorState>({
    page: 0,
    rows: 25,
  });
  ngOnInit(): void {
    this.getData();
    // console.log(this.currentLang(),'currentLang')
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
          };

          return this.dataService.get(data).pipe(
            finalize(() => {
              this.loading.set(false);
            })
          );
        })
      )
      .subscribe({
        next: (res: { results: Area[]; count: number } | Area[]) => {
          if (!Array.isArray(res)) {
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

  openDialog(obj?: Area) {
    const cloneObject = JSON.parse(JSON.stringify(obj ? obj : AreaDefault));
    //   ? Tag.fromJSON(JSON.parse(JSON.stringify(obj.toPlainObject()))) // Deep clone and rehydrate
    //   : new Tag();
    const dialog = this.dialogService.open(AddEditAreaDialogComponent, {
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

  delete(obj: Area, index: number) {
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
        this.dataService.delete(obj.id!).subscribe({
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
      },
    });
  }
}
