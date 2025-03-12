import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  ImageCropperComponent,
  ImageCropperModule,
  OutputFormat,
} from 'ngx-image-cropper';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-image-cropper-dialog',
  templateUrl: './image-cropper-dialog.component.html',
  styleUrls: ['./image-cropper-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ImageCropperModule, CommonModule, TranslateModule, ButtonModule],
})
export class ImageCropperDialogComponent implements OnInit {
  dynamicDialogConfig = inject(DynamicDialogConfig) as
    | {
        aspectRatio: number;
        imageBase64: any;
        format: OutputFormat;
        max_image_width: number;
        maintainAspectRatio: boolean;
        cropperStaticHeight: number;
        cropperStaticWidth: number;
        imageFile: Blob;
      }
    | any;
  dynamicDialogRef = inject(DynamicDialogRef) as any;
  cd = inject(ChangeDetectorRef);

  imageChangedEvent: any = '';
  croppedImage: string = '';
  @ViewChild(ImageCropperComponent, { static: false })
  imageCropper!: ImageCropperComponent;

  ngOnInit(): void {
    this.imageChangedEvent = this.dynamicDialogConfig.data;
    this.cd.detectChanges();
  }

  imageCropped(event: any) {
    this.croppedImage = event.base64;
  }
  doneCropping() {
    this.dynamicDialogRef.close(this.croppedImage);
  }
}
