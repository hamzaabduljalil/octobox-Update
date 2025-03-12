import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ButtonModule } from "primeng/button";
import { ButtonGroupModule } from "primeng/buttongroup";
import { CheckboxModule } from "primeng/checkbox";
import { DialogModule } from "primeng/dialog";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { InputTextModule } from "primeng/inputtext";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PaginatorModule, PaginatorState } from "primeng/paginator";
import { SkeletonModule } from "primeng/skeleton";
import { TableModule } from "primeng/table";
import { BehaviorSubject, finalize, switchMap } from "rxjs";
import { AddCompneyDialogComponent } from "./dialogs/add-compney-dialog/add-compney-dialog.component";
// import Company from '../../models/Company';
import { HttpClient } from "@angular/common/http";
import { ConfirmationService, MessageService } from "primeng/api";
import { Company, CompanyDefault } from "../../models/Interfaces/Company";
import { ShippingCompanyService } from "../../services/dataServices/shipping-company.service";
import { ChangeLangService } from "../../services/other/change-lang.service";
import { deepMergeAndOverwrite } from "../../services/other/staticFunctions";
import { ToastService } from "../../services/other/toast.service";

interface Products {
  id: string;
  name: string;
}

@Component({
  selector: "app-company",
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
  templateUrl: "./company.component.html",
  styleUrl: "./company.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent {
  confirmationService = inject(ConfirmationService);
  dialogService = inject(DialogService);
  http = inject(HttpClient);
  messageService = inject(MessageService);

  dataService = inject(ShippingCompanyService);
  toastService = inject(ToastService);
  cls = inject(ChangeLangService);
  tr = inject(TranslateService);
  currentLang = inject(ChangeLangService).currentLang;

  loading = signal(false);
  count = signal(0);

  objs = signal<Company[]>([]);

  selectedObj: Company | null = null;
  dynamicDialogRef: DynamicDialogRef | undefined;
  searchValue = "";
  cols = [
    { field: "name", header: "Name" },
    { field: "processes", header: "Processes" },
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
          this.count.set(0)
          this.loading.set(true);

          const data = {
            skip: event.page!,
            limit: event.rows!,
            withCount: true,
            searchValue: this.searchValue,
            sortKey:'createdAt',
            sortOrder:-1
          };

          return this.dataService.get(data).pipe(
            finalize(() => {
              this.loading.set(false);
            })
          );
        })
      )
      .subscribe({
        next: (res: { results: Company[]; count: number } | Company[]) => {
          if (!Array.isArray(res)) {
            this.objs.set(res.results);
            this.count.set(res.count)
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

  openDialog(obj?: Company) {
    const cloneObject = JSON.parse(JSON.stringify(obj ? obj : CompanyDefault));
    const dialog = this.dialogService.open(AddCompneyDialogComponent, {
      header: this.tr.instant(obj ? "Edit" : "Add"),
      footer: ".",
      width: "600px",
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

  delete(obj: Company, index: number) {
    this.confirmationService.confirm({
      header: this.tr.instant("Delete"),
      message: this.tr.instant("Delete This Row"),
      icon: "fa-solid fa-trash-can fa-2xl",
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
        this.dataService
          .delete(obj.id)
          .subscribe({
            next: () => {
              this.count.set(this.count()-1)
              this.objs().splice(index, 1);
              this.toastService.showToast(
                "success",
                "",
                this.tr.instant("Deleted Successfully")
              );
              this.getData()
            },
          });
      },
    });
  }
}
