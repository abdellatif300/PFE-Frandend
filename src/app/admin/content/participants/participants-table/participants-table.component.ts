import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { Participant } from 'src/app/models/participant.model';
import { ParticipantService } from 'src/app/services/participant.service';
import { ToastService } from 'src/app/services/toast.service';

export interface TableElements {
  id: number;
  firstname: string;
  lastname: string;
  birthday: Date;
  email: string;
  phone: string;
  city: string;
  evaluated: boolean;
  assigned: boolean;
  course: Course;
}

@Component({
  selector: 'app-participants-table',
  templateUrl: './participants-table.component.html',
  styleUrls: [
    './participants-table.component.css',
    './../../../layout/layout.component.css',
    './.././../../layout/bootstrap-overwrite.css',
  ],
})
export class ParticipantsTableComponent implements OnInit {
  @ViewChild('participantTable') participantTable: any; // Change 'any' to the appropriate type if known


  constructor(
    private participantService: ParticipantService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private toast: ToastService
  ) {}

  participants: Participant[] = [];
  isAllSelected = false;

  ngOnInit(): void {
    this.getParticipants();
  }

  getParticipants(): void {
    this.participantService.getParticipants().subscribe(
      (data: Participant[]) => {
        console.log('fetch participants:', data);
        this.participants = data;
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error fetching participants:', error);
      }
    );
  }

  displayedColumns: string[] = [
    'fullname',
    'birthday',
    'email',
    'phone',
    'city',
    'evaluated',
    'assigned',
    'course',
    'action',
  ];
  clickedRows = new Set<TableElements>();

  assignToCourse(id: number): void {
    this.participantService.assignToCourse(id).subscribe(
      (response) => {
        console.log(response);
        this.toast.showError("Error assigning participant to course:");
        this.refreshTable();
      },
      (error) => {
        console.log(error);
        this.toast.showSuccess('Assigninig has been made successfully');
        this.refreshTable();
      }
      );
  }

  private refreshTable(): void {
    this.getParticipants();
  }

}
