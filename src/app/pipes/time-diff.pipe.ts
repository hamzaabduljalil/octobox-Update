import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "timeDiff",
  standalone: true,
})
export class TimeDiffPipe implements PipeTransform {
  transform(startDate: Date, endDate: Date): string {
    if (!startDate || !endDate) {
      return "Invalid Dates";
    }

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    if (isNaN(start) || isNaN(end)) {
      return "Invalid Dates";
    }

    const diffMs = Math.abs(end - start);
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${this.padZero(hours)}:${this.padZero(minutes)}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
