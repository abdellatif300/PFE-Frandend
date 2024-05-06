import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit-dialog-component',
  templateUrl: './edit-dialog-component.html',
  styleUrls: ['./companies-table.component.css'],

})
export class EditDialogComponentComponent implements OnInit {

  form :FormGroup= new FormGroup({});;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      // define your form controls here
    });
  }

}
