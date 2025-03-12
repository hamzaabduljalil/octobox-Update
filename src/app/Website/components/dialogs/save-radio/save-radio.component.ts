import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
@Component({
  selector: "app-save-radio",
  standalone: true,
  imports: [DialogModule, ButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./save-radio.component.html",
  styleUrl: "./save-radio.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveRadioComponent {
  @Input() title: string = "";
  @Input() address: string = "";
  @Input() description: string = "";
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() addresses: {
    title: string;
    description: string;
    weight?: string;
  }[] = [];

  showDialog() {
    this.visible = true;
    this.visibleChange.emit(this.visible);
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  selectedAddress: number | null = 0;

  get hasText(): boolean {
    return this.addresses.some((address) => !!address.weight);
  }
}
