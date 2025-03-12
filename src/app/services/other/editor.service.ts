import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CKEditorDialogComponent } from '../../components/shared/dialogs/ck5editor/ck5editor.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
  
})
export class EditorService {
  constructor(private dialogService: DialogService) {}

  openEditor(content: string, language: 'ar' | 'en'): Observable<string> {
    const ref = this.dialogService.open(CKEditorDialogComponent, {
      data: {
        input: content,
        hint: "Enter your content here",
      },
      header: "Editor",
      width: "60%",
    });

    return ref.onClose;
  }
} 