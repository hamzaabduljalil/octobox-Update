import {
  ChangeDetectionStrategy,
  Component,
  Input,
  EventEmitter,
  Output,
  HostListener,
  ElementRef, // ✅ Import ElementRef
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MultiSelectModule } from "primeng/multiselect";
import { SaveAddressesComponent } from "../dialogs/save-addresses/save-addresses.component";
import { SaveRadioComponent } from "../dialogs/save-radio/save-radio.component";

@Component({
  selector: "app-weight-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MultiSelectModule,
    SaveRadioComponent,
    SaveAddressesComponent,
  ],
  templateUrl: "./weight-form.component.html",
  styleUrls: ["./weight-form.component.scss"], // ✅ Fixed styleUrls
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeightFormComponent {
  @Input() form!: FormGroup;
  @Input() isShow: boolean = false;
  @Input() isShowRadio: boolean = false;
  @Output() isShowChange = new EventEmitter<boolean>();
  @Output() isShowRadioChange = new EventEmitter<boolean>();
  @Input() selectedType: string = "";

  quantity = [
    { name: "1", code: "1" },
    { name: "2", code: "2" },
    { name: "3", code: "3" },
    { name: "4", code: "4" },
    { name: "5", code: "5" },
  ];

  addresses = [
    {
      title: "Package Name",
      description: "L: 999 c.m | W: 999 c.m | H: 999 c.m ",
      weight: "Weight: 999 k.g",
    },
    {
      title: "Package Name",
      description: "L: 999 c.m | W: 999 c.m | H: 999 c.m ",
      weight: "Weight: 999 k.g",
    },
    {
      title: "Package Name",
      description: "L: 999 c.m | W: 999 c.m | H: 999 c.m ",
      weight: "Weight: 999 k.g",
    },
  ];

  addressType = "";
  isDialogVisible = false;
  isDialogRadioVisible = false;
  isDropdownOpen = false;

  constructor(private fb: FormBuilder, private eRef: ElementRef) {} // ✅ Merged constructor

  ngOnInit() {
    if (!this.form) {
      this.form = this.fb.group({
        length: [""],
        width: [""],
        height: [""],
        weight: [""],
        description: [""],
        quantity: [""],
        isDropdownOpen: [false],
        expanded: [false],
        items: this.fb.array([]),
      });
    }

    this.items.controls.forEach((item) => {
      if (!item.value.hasOwnProperty("isDropdownOpen")) {
        item.patchValue({ isDropdownOpen: false });
      }
    });
  }

  addItem() {
    this.items.push(
      this.fb.group({
        length: [""],
        width: [""],
        height: [""],
        weight: [""],
        description: [""],
        expanded: [false],
        isDropdownOpen: [false],
      })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  toggleExpand(index: number) {
    const item = this.items.at(index);
    item.patchValue({ expanded: !item.value.expanded });
  }

  get items(): FormArray {
    return this.form.get("items") as FormArray;
  }

  selectType(type: string): void {
    this.selectedType = type;
  }

  openDialog() {
    this.isDialogVisible = true;
  }

  openDialogRadio() {
    this.isDialogRadioVisible = true;
  }

  toggleDropdown(index: number, event: Event) {
    event.stopPropagation(); // ✅ Prevent immediate closing

    this.items.controls.forEach((item, i) => {
      if (!item.value.hasOwnProperty("isDropdownOpen")) {
        item.patchValue({ isDropdownOpen: false });
      }

      item.patchValue({
        isDropdownOpen: i === index ? !item.value.isDropdownOpen : false,
      });
    });

    console.log(
      "Current State After:",
      this.items.controls.map((i) => i.value.isDropdownOpen)
    );
  }

  toggleShow() {
    this.isShow = !this.isShow;
    this.isShowChange.emit(this.isShow);
  }

  toggleShowRadio() {
    this.isShowRadio = !this.isShowRadio;
    this.isShowRadioChange.emit(this.isShowRadio);
  }

  @HostListener("document:click", ["$event"])
  closeDropdown(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.items.controls.forEach((item) =>
        item.patchValue({ isDropdownOpen: false })
      );
    }
  }
}
