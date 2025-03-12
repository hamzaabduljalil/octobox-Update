import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Range } from '../../models/Interfaces/Range';
import { SharedVarsService } from '../other/shared-vars.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RangeService {
  http = inject(HttpClient);
  sharedVarService = inject(SharedVarsService);
  baseURL = this.sharedVarService.baseURL;
  token = inject(AuthService).token

  createRange(body: Range): Observable<Range> {
    return this.http.post<Range>(this.baseURL + "/range", body, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

}
