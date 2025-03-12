import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonModule } from "primeng/button";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ChangeLangService } from "../../../services/other/change-lang.service";
import { ImageCropperDialogComponent } from "../dialogs/image-cropper-dialog/image-cropper-dialog.component";
import File from "../../../models/File";

@Component({
  selector: "app-image-uploader",
  standalone: true,
  imports: [ButtonModule, TranslateModule],
  templateUrl: "./image-uploader.component.html",
  styleUrl: "./image-uploader.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("dragging", [
      state(
        "true",
        style({
          opacity: 1,
        })
      ),
      state(
        "false",
        style({
          boxShadow: "none",
          opacity: 0.8,
        })
      ),
      transition("false => true", [animate("200ms")]),
      transition("true => false", [animate("200ms")]),
    ]),
  ],
})
export class ImageUploaderComponent implements AfterViewInit {
  @HostBinding("@dragging") isNotDragging: boolean = true;

  dataImage = "";

  // @Input({ required: true }) object!: any;
  @Input({ required: true }) aspectRatio!: number;
  @Input({ required: true }) file!: File;
  @Input({ required: false }) canDelete = true;

  @Output() fileChange = new EventEmitter<File>();

  constructor(
    public imageCropperDialogComponentRef: DynamicDialogRef,
    private dialogService: DialogService,

    private cd: ChangeDetectorRef,
    public langService: ChangeLangService
  ) {}
  ngAfterViewInit(): void {
    if (this.file.url) {
      this.dataImage = this.file.url;
      this.cd.detectChanges();
    }
  }
  onFileDropped(event: any) {
    event.preventDefault();
    this.uploadImage(event.dataTransfer.files);
    this.isNotDragging = false;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isNotDragging = true;
    this.cd.detectChanges();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isNotDragging = false;
    this.cd.detectChanges();
  }
  uploadFile() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".jpg, .jpeg, .png, , .webp";
    fileInput.addEventListener("change", (event: any) =>
      this.uploadImage(event?.target?.files)
    );
    fileInput.click();
  }
  async uploadImage(image: FileList) {
    const imageFile = image.item(0);
    // const maxFileSize = 2 * 1024 * 1024; // 1MB
    // if (imageFile!.size > maxFileSize) {
    //   alert("File size should not exceed 1MB.");
    //   return;
    // }

    this.imageCropperDialogComponentRef = this.dialogService.open(
      ImageCropperDialogComponent,
      {
        header: ".",
        footer: ".",
        data: {
          aspectRatio: this.aspectRatio,
          imageFile: imageFile,
          format: "webp",
          max_image_width: 400,
          maintainAspectRatio: true,
        },
        width: "300px",
      }
    );
    this.imageCropperDialogComponentRef.onClose.subscribe(
      async (base64Image) => {
        if (base64Image) {
          if (!this.file) {
            this.file = new File();
          }

          this.file.base64 = base64Image;
          this.file.name = "image.webp";
          this.file.type = "webp";

          this.dataImage = base64Image;
          this.fileChange.emit(this.file);

          this.cd.detectChanges();
        }
      }
    );
  }
  removeImage() {
    this.file.id = undefined;
    this.file.url = undefined;
    this.file.base64 = undefined;

    this.dataImage = "";

    this.cd.detectChanges();
  }
}
