import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-participant-dialog',
  templateUrl: './participant-dialog.component.html',
  styleUrls: ['./participant-dialog.component.css']
})
export class ParticipantDialogComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedParticipants: any[] }) {
    console.log('Received Selected Participants:', data.selectedParticipants);
  }

}
