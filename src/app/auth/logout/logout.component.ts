import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private logoutService: LogoutService, private router: Router) { }

  ngOnInit(): void {
    this.logoutService.logout();
    this.router.navigate(['/dashboard']);
  }

}
