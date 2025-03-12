import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "fileName",
  standalone: true,
})
export class FileNamePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return "";

    // Extract the portion after the last underscore
    const match = value.match(/_(.+)$/);
    return match ? match[1] : value; // Return the match or the original value if no match
  }
}
