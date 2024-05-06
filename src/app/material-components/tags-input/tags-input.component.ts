import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Keyword } from 'src/app/models/keyword.model';
import { KeywordService } from 'src/app/services/keyword.service';

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.css'],
})
export class TagsInputComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  keywords: Keyword[] = [];

  announcer = inject(LiveAnnouncer);


  constructor(private keywordService: KeywordService) {
    this.keywords = this.keywordService.getKeywords();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.keywordService.addKeyword({ name: value });
    }

    event.chipInput!.clear();
  }

  remove(keyword: Keyword): void {
    this.keywordService.removeKeyword(keyword);
  }

  edit(keyword: Keyword, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(keyword);
      return;
    }

    this.keywordService.updateKeyword(keyword, { name: value });
  }

}
