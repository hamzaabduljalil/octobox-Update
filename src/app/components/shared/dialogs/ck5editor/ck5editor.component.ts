import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeLangService } from '../../../../services/other/change-lang.service';

import { FormsModule } from '@angular/forms';
import {
  Alignment,
  Autoformat,
  BalloonToolbar,
  Bold,
  Editor,
  FontSize,
  Heading,
  HorizontalLine,
  Indent,
  IndentBlock,
  List,
  ListProperties,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersText,
  TextTransformation,
  Underline,
  type EditorConfig,
} from 'ckeditor5';
import { ButtonModule } from 'primeng/button';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessagesModule } from 'primeng/messages';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
@Component({
  selector: 'app-ckeditor-dialog',
  standalone: true,
  imports: [
    CKEditorModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    TranslateModule,
    MessagesModule,
  ],
  templateUrl: './ck5editor.component.html',
  styleUrl: './ck5editor.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CKEditorDialogComponent implements AfterViewInit {
  public Editor: any = DecoupledEditor;
  public config: any;
  public isLayoutReady = false;

  @ViewChild('editorToolbarElement')
  private editorToolbar!: ElementRef<HTMLDivElement>;

  constructor(
    public dynamicDialogConfig: DynamicDialogConfig<{
      text: string;
    }>,
    public dynamicDialogRef: DynamicDialogRef,
    public langService: ChangeLangService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.config = {
      toolbar: {
        items: [
          'heading',
          '|',
          'fontSize',
          '|',
          'bold',
          '|',
          'horizontalLine',
          'alignment',
          '|',
          'outdent',
          'indent',
        ],
        shouldNotGroupWhenFull: true,
      },

      plugins: [
        Alignment,
        Autoformat,
        BalloonToolbar,
        Bold,
        FontSize,
        Heading,
        HorizontalLine,
        Indent,
        IndentBlock,
        List,
        ListProperties,
        Paragraph,
        SelectAll,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersText,
        TextTransformation,
        Underline,
      ],
      balloonToolbar: ['bold', '|', 'bulletedList', 'numberedList'],

      fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true,
      },
      heading: {
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph',
          },
          {
            model: 'heading1',
            view: 'h1',
            title: 'Heading 1',
            class: 'ck-heading_heading1',
          },
          {
            model: 'heading2',
            view: 'h2',
            title: 'Heading 2',
            class: 'ck-heading_heading2',
          },
          {
            model: 'heading3',
            view: 'h3',
            title: 'Heading 3',
            class: 'ck-heading_heading3',
          },
          {
            model: 'heading4',
            view: 'h4',
            title: 'Heading 4',
            class: 'ck-heading_heading4',
          },
          {
            model: 'heading5',
            view: 'h5',
            title: 'Heading 5',
            class: 'ck-heading_heading5',
          },
          {
            model: 'heading6',
            view: 'h6',
            title: 'Heading 6',
            class: 'ck-heading_heading6',
          },
        ],
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true,
        },
      },

      placeholder: 'Type or paste your content here!',
    };
    this.isLayoutReady = true;
    this.cd.detectChanges();
  }

  onReady(editor: any): void {
    Array.from(this.editorToolbar.nativeElement.children).forEach((child) =>
      child.remove()
    );

    this.editorToolbar.nativeElement.appendChild(
      (editor as any).ui.view.toolbar.element!
    );
  }
}
