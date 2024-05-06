import { Component, OnInit, ViewChild } from '@angular/core';
import { ParticipantsTableComponent } from '../participants-table/participants-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ParticipantDialogComponent } from '../participant-dialog/participant-dialog.component';
import { ParticipantService } from 'src/app/services/participant.service';
import { Email } from 'src/app/models/email.model';
import { ActivatedRoute } from '@angular/router';
import { AssignedParticipantTableComponent } from '../assigned-participant-table/assigned-participant-table.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant-main.component.html',
  styleUrls: [
    './participant-main.component.css',
    './../../../layout/layout.component.css',
    './.././../../layout/bootstrap-overwrite.css',
  ],
})
export class ParticipantMainComponent implements OnInit {

  constructor(public dialog: MatDialog, private participantService: ParticipantService, private route: ActivatedRoute, private toast:ToastService) {}

  ngOnInit(): void {
  }

  isParticipantsRoute(): boolean {
    return this.route.snapshot.routeConfig?.path === 'participants/all';
  }

  isAssignedParticipantsRoute(): boolean {
    return this.route.snapshot.routeConfig?.path === 'participants/assigned';
  }




  @ViewChild(ParticipantsTableComponent)
  participantsTableComponent!: ParticipantsTableComponent;

  @ViewChild(AssignedParticipantTableComponent)
  assignedParticipantsTableComponent!: AssignedParticipantTableComponent;





  sendFeedbackMail() {
    const assignedParticipants = this.assignedParticipantsTableComponent.selectedParticipants;

    assignedParticipants.forEach(participant => {
      const email: Email = {
        to: participant.email,
        subject: 'Course Feedback',
        body: 'Hope you enjoyed the course, Go rate your experience.',
        // courseId :participant.courseId,
        // participantId : participant.id,
        courseId: encodeURIComponent(participant.courseId),
        participantId: encodeURIComponent(participant.id),
      };

      this.participantService.sendFeedbackMail(email).subscribe(
        (response) => {
          console.error('Error sending feedback email:');
          this.toast.showSuccess('Error sending feedback email');
        },
        error => {
          console.log('Feedback email sent successfully:');
          this.toast.showSuccess('Email has been sent successfully!');
        }
      );
    });
  }



  //can be used later

  // openDialog() {
  //   // Access the selected participants from the child component
  //   const selectedParticipants = this.participantsTableComponent.selectedParticipants;
  //   console.log('Selected Participants to pass to dialog:', selectedParticipants);

  //   // Pass the selected participants as data when opening the dialog
  //   const dialogRef = this.dialog.open(ParticipantDialogComponent, {
  //     data: { selectedParticipants: selectedParticipants }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
}
