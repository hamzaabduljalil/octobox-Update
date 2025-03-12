import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-choose-package",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./choose-package.component.html",
  styleUrl: "./choose-package.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoosePackageComponent {
  @Input() types: string[] = [];
  @Input() selectedType: string = "";
  @Output() typeSelected = new EventEmitter<string>();

  selectType(type: string): void {
    this.selectedType = type;
    this.typeSelected.emit(type);
  }
}
