import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.css']
})
export class ImagePopupComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ImagePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}


  image!: string;

  ngOnInit(): void {
    this.image = this.data.image;
  }

}
