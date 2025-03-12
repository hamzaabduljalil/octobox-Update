import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SharedVarsService {
  // Staging
  readonly baseURL = "https://server-octobox.onrender.com/api";
  // readonly baseURL = "http://localhost:3000/api";

  readonly wss = "wss://li.justfortesting.ovh/api";

  // Prod
  // readonly baseURL = window.location.origin + "/api";
  // readonly wss = "wss://" + window.location.host + "/api";
}
