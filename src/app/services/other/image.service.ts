import { Injectable } from '@angular/core';
import { NgxImageCompressService, UploadResponse } from 'ngx-image-compress';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageCropperDialogComponent } from '../../components/shared/dialogs/image-cropper-dialog/image-cropper-dialog.component';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imageCropperDialogRef: DynamicDialogRef | undefined;

  constructor(
    private imageCompress: NgxImageCompressService,
    private dialogService: DialogService
  ) {}

  processImage(aspectRatio: number = 4): Observable<{name: string, url: string} | null> {
    return new Observable(observer => {
      this.imageCompress.uploadFile().then(({ image }: UploadResponse) => {
        this.imageCropperDialogRef = this.dialogService.open(
          ImageCropperDialogComponent,
          {
            header: ".",
            footer: ".",
            data: { 
              aspectRatio,
              imageBase64: image,
              format: "webp",
              max_image_width: 400,
              maintainAspectRatio: true,
            },
          }
        );

        this.imageCropperDialogRef.onClose.subscribe(img => {
          if (img) {
            observer.next({
              name: img.name ? img.name : 'name',
              url: "data:image/webp;base64," + img._data
            });
          } else {
            observer.next(null);
          }
          observer.complete();
        });
      });
    });
  }
}