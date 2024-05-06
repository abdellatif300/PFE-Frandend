
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GuardService } from './guard.service';
@Injectable({
  providedIn: 'root'
})
export class GuardAuthService implements CanActivate {

  constructor(private guardService: GuardService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    if (this.guardService.isAuthenticated() && (this.guardService.isAdmin() || this.guardService.isAssistant())) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}

