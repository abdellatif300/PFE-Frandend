import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { Participant } from 'src/app/models/participant.model';
import { ParticipantService } from 'src/app/services/participant.service';

export interface TableElements {
  id: number;
  firstname: string;
  lastname: string;
  birthday: Date;
  email: string;
  phone: string;
  city: string;
  evaluated: boolean;
}


@Component({
  selector: 'app-assigned-participant-table',
  templateUrl: './assigned-participant-table.component.html',
  styleUrls: ['./assigned-participant-table.component.css']
})
export class AssignedParticipantTableComponent implements OnInit {

  constructor(
    private participantService: ParticipantService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {}

  participants: Participant[] = [];
  isAllSelected = false;

  ngOnInit(): void {
    this.getParticipants();
  }

  getParticipants(): void {
    this.participantService.getParticipants()
      .subscribe(
        (data: Participant[]) => {
          console.log('fetch participants:', data);
          this.participants = data.filter(participant => participant.assigned);
          this.changeDetectorRef.detectChanges();
        },
        error => {
          console.error('Error fetching participants:', error);
        }
      );
  }

  displayedColumns: string[] = ['fullname', 'birthday', 'email', 'phone', 'city', 'course', 'evaluated', 'select'];
  clickedRows = new Set<TableElements>();
  selectedParticipants: Participant[] = [];

  onCheckboxChange(participant: Participant): void {
    if (participant.selected) {
      this.selectedParticipants.push(participant);
    } else {
      const index = this.selectedParticipants.indexOf(participant);
      if (index !== -1) {
        this.selectedParticipants.splice(index, 1);
      }
    }

    console.log("rows ",this.selectedParticipants);
  }

  selectAll(event: MatCheckboxChange): void {
    this.selectedParticipants = [];  // Clear the array before updating
    this.isAllSelected = event.checked;

    // Set selected state for all participants based on "Select All" checkbox
    this.participants.forEach(p => p.selected = this.isAllSelected);

    // Update individual checkboxes based on "Select All" state
    this.participants.forEach(p => this.onCheckboxChange(p));

    console.log(this.selectedParticipants);
  }
}
