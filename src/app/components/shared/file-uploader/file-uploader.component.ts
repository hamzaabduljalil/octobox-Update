import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import {
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
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { FileNamePipe } from "../../../pipes/file-name.pipe";
import { ChangeLangService } from "../../../services/other/change-lang.service";
import File from "../../../models/Interfaces/File";

@Component({
  selector: "app-file-uploader-list",
  standalone: true,
  imports: [ButtonModule, TranslateModule, FileNamePipe],
  templateUrl: "./file-uploader-list.component.html",
  styleUrl: "./file-uploader-list.component.scss",
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
export class FileUploaderListComponent {
  @HostBinding("@dragging") isNotDragging: boolean = true;

  @Input({ required: true }) files!: File[];
  @Output() filesChange = new EventEmitter<File[]>();

  constructor(
    public imageCropperDialogComponentRef: DynamicDialogRef,
    private cd: ChangeDetectorRef,
    public langService: ChangeLangService
  ) {}
  ngAfterViewInit(): void {}
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
    fileInput.addEventListener("change", (event: any) =>
      this.uploadVideo(event?.target?.files)
    );
    fileInput.click();
  }
  async uploadVideo(fileList: FileList) {
    const file = fileList.item(0);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;

      this.files.push(); // Ensure using your custom File model

      const finalFile = new File();

      finalFile.base64 = base64;
      finalFile.name = file.name;
      finalFile.type = file.type;
      this.files.push(finalFile);

      this.filesChange.emit(this.files); // Emit updated File instance

      this.cd.detectChanges();
    };

    reader.readAsDataURL(file); // Convert video file to base64
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
    this.filesChange.emit(this.files); // Emit updated File instance

    this.cd.detectChanges();
  }

  viewFile(index: number) {
    const data = this.files[index].url;
    window.open(data, "_blank");
  }
}
