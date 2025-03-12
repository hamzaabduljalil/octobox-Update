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
  selector: "app-shipping-method",
  standalone: true,
  imports: [ButtonModule, DialogModule],
  templateUrl: "./shipping-method.component.html",
  styleUrl: "./shipping-method.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingMethodComponent {
  @Input() title: string = "";
  @Input() label: string = "";
  @Input() visible: boolean = false;
  @Input() book: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() bookChanges = new EventEmitter<boolean>();
  showDialog() {
    this.visible = true;
    this.visibleChange.emit(this.visible);
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  handleBookClick() {
    this.book = true;
    this.bookChanges.emit(this.book);
  }
}
