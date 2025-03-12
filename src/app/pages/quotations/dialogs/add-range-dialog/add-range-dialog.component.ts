import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { Range, RangeDefault } from '../../../../models/Interfaces/Range';
import { RangeService } from '../../../../services/dataServices/range.service';
import { ToastService } from '../../../../services/other/toast.service';

@Component({
  selector: 'app-add-range-dialog',
  standalone: true,
  imports: [TranslateModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './add-range-dialog.component.html',
  styleUrl: './add-range-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRangeDialogComponent {
  translate = inject(TranslateService);
  dynamicDialogRef = inject(DynamicDialogRef);
  dialogService = inject(DialogService);
  rangeService = inject(RangeService);
  toastService = inject(ToastService);
  dynamicDialogConfig = inject(DynamicDialogConfig) as {
    data?: {
      obj?: Range;
    };
  };
  currentLang: string = 'en';
  minRange?: number;
  maxRange?: number;
  price?: number;

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((val) => {
      this.currentLang = val.lang;
    });
    this.currentLang = this.translate.currentLang || 'en';
  }

  save(obj?: Range) {
    const cloneObject = JSON.parse(JSON.stringify(obj ? obj : RangeDefault));
    cloneObject.minRange = this.minRange;
    cloneObject.maxRange = this.maxRange;
    cloneObject.price = this.price;
    this.rangeService.createRange(cloneObject).subscribe({
      next: (data) => {
        console.log(data);
        this.dynamicDialogRef.close(data);
      },
      error: (e) => {
        this.toastService.showToast_error(e);
      },
    });
  }
}
