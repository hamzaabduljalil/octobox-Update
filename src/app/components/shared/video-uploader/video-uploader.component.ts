import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from "@angular/core";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ChangeLangService } from "../../../services/other/change-lang.service";
import File from "../../../models/File";
import { ButtonModule } from "primeng/button";
import { TranslateModule } from "@ngx-translate/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

@Component({
  selector: "app-video-uploader",
  standalone: true,
  imports: [ButtonModule, TranslateModule],
  templateUrl: "./video-uploader.component.html",
  styleUrl: "./video-uploader.component.scss",
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
export class VideoUploaderComponent {
  @HostBinding("@dragging") isNotDragging: boolean = true;

  data = "";

  // @Input({ required: true }) object!: any;
  @Input({ required: true }) aspectRatio!: number;
  @Input({ required: true }) file!: File;

  @Output() fileChange = new EventEmitter<File>();

  constructor(
    public imageCropperDialogComponentRef: DynamicDialogRef,
    private dialogService: DialogService,

    private cd: ChangeDetectorRef,
    public langService: ChangeLangService
  ) {}
  ngAfterViewInit(): void {
    if (this.file.url) {
      this.data = this.file.url;
      this.cd.detectChanges();
    }
  }
  onFileDropped(event: any) {
    event.preventDefault();
    this.uploadVideo(event.dataTransfer.files);
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
    fileInput.accept = ".mp4";
    fileInput.addEventListener("change", (event: any) =>
      this.uploadVideo(event?.target?.files)
    );
    fileInput.click();
  }
  async uploadVideo(fileList: FileList) {
    const file = fileList.item(0);
    if (!file) return;
    // const maxFileSize = 100 * 1024 * 1024; // 100MB

    // if (file.size > maxFileSize) {
    //   alert("File size should not exceed 100MB.");
    //   return;
    // }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Video = reader.result as string;

      if (!this.file) {
        this.file = new File(); // Ensure using your custom File model
      }

      this.file.base64 = base64Video;
      this.file.name = file.name;
      this.file.type = file.type;

      this.fileChange.emit(this.file); // Emit updated File instance

      this.data = base64Video; // Set video preview data
      this.cd.detectChanges();
    };

    reader.readAsDataURL(file); // Convert video file to base64
  }

  removeVideo() {
    this.file.id = undefined;
    this.file.url = undefined;
    this.file.base64 = undefined;
    this.file.type = undefined;

    this.data = "";

    this.cd.detectChanges();
  }
}
