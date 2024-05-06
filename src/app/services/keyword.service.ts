import { Injectable } from '@angular/core';
import { Keyword } from '../models/keyword.model';

@Injectable({
  providedIn: 'root'
})
export class KeywordService {
  private keywords: Keyword[] = [];

  getKeywords(): Keyword[] {
    return this.keywords;
  }

  addKeyword(keyword: Keyword): void {
    this.keywords.push(keyword);
  }

  removeKeyword(keyword: Keyword): void {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  updateKeyword(oldKeyword: Keyword, newKeyword: Keyword): void {
    const index = this.keywords.indexOf(oldKeyword);
    if (index >= 0) {
      this.keywords[index] = newKeyword;
    }
  }

  clearKeywords(): void {
    this.keywords = [];
  }
}
