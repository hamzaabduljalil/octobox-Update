import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2
} from "@angular/core";

@Directive({
  selector: "[appTextDirection]",
  standalone: true,
})
export class TextDirectionDirective implements OnInit {
  direction!: "rtl" | "ltr";

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.direction = localStorage.getItem("langCode") === "en" ? "ltr" : "rtl";
    this.updateClasses();
  }

  private updateClasses(): void {
    const element = this.el.nativeElement;

    this.renderer.removeClass(element, "text-right");
    this.renderer.removeClass(element, "text-left");

    if (this.direction === "rtl") {
      this.renderer.addClass(element, "text-right");
    } else if (this.direction === "ltr") {
      this.renderer.addClass(element, "text-left");
    }

    this.renderer.addClass(element, "w-full");
  }
}
