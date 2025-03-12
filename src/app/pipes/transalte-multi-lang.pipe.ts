import { Pipe, PipeTransform } from "@angular/core";
import { MultiLangs } from "../models/Interfaces/MultiLangs";

@Pipe({
  name: "transalteMultiLang",
  standalone: true,
  pure: false,
})
export class TransalteMultiLangPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return "";
    }

    if (typeof value === "object") {
      const obj: MultiLangs = value;
      const lang = localStorage.getItem("langCode");
      if (obj[lang as keyof MultiLangs]) {
        return obj[lang as keyof MultiLangs]!;
      } else if (obj["en"]) {
        return obj["en"]!;
      } else if (obj["ar"]) {
        return obj["ar"]!;
      }
    }

    return "";
  }
}
