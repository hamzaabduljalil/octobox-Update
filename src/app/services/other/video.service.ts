import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  processVideo(): Observable<any> {
    const result = new Subject<any>();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';

    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 600 * 1024 * 1024) {
          console.error('File size exceeds 600MB limit.');
          result.next(null);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e: any) => {
          result.next({
            url: e.target.result,
            name: file.name
          });
        };

        reader.onerror = (error) => {
          console.error('Error reading file:', error);
          result.next(null);
        };

        reader.readAsDataURL(file);
      }
    };
    input.click();
    return result.asObservable();
  }
}