import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-text-popup',
  templateUrl: './text-popup.component.html',
  styleUrls: ['./text-popup.component.css']
})
export class TextPopupComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<TextPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  text!: string;

  ngOnInit(): void {
    this.text = this.data.text;
  }
}
