import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-customr-service",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./customr-service.component.html",
  styleUrl: "./customr-service.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomrServiceComponent {}
