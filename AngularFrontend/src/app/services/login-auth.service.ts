
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthService implements CanActivate {
  constructor(private router: Router, private tokenService: TokenService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.tokenService.isAuthenticated()) {
        return true;
      } else {
        switch (this.tokenService.getUserRole()) {
          case 0:
            this.router.navigate(['/admin/dashboard']);
            break;
          case 1:
            this.router.navigate(['/home']);
            break;
          case 2:
            this.router.navigate(['/artist/dashboard']);
            break;
          default:
            break;
        }
        return false;
      }
  }
}
