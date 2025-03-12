import { Pipe, PipeTransform } from "@angular/core";
import { MultiLangs } from "../models/Interfaces/MultiLang";

@Pipe({
  name: "currentTranslation",
  standalone: true,
})
export class CurrentTranslationPipe implements PipeTransform {
  currentLang = localStorage.getItem("langCode") as "en" | "ar";

  transform(value: MultiLangs): string {
    if (!value) {
      return "";
    }
    if (typeof value === "object") {
      if (this.currentLang === "ar") return `${value.ar}`;
      if (this.currentLang === "en") return `${value.en}`;
    }
    return "";
  }
}
