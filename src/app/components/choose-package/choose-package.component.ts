import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import this

@Component({
  selector: 'app-choose-package',
  standalone: true, // ✅ Ensure standalone component
  imports: [CommonModule], // ✅ Add CommonModule to use *ngFor
  templateUrl: './choose-package.component.html',
  styleUrl: './choose-package.component.css',
})
export class ChoosePackageComponent {
  @Input() types: string[] = [];
  @Input() selectedType: string = '';
  @Output() typeSelected = new EventEmitter<string>();

  selectType(type: string): void {
    this.selectedType = type; // Update the local state
    this.typeSelected.emit(type); // Emit the event to the parent component
  }
}
