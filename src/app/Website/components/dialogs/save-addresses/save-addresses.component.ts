import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";

@Component({
  selector: "app-save-addresses",
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: "./save-addresses.component.html",
  styleUrl: "./save-addresses.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveAddressesComponent {
  @Input() title: string = "";
  @Input() label: string = "";
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  showDialog() {
    this.visible = true;
    this.visibleChange.emit(this.visible);
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
