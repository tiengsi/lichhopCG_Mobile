import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthModel } from '../models/auth.model';
@Injectable()
export class UserGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userToken: string = this.authService.getToken();
    const objUser: AuthModel = JSON.parse(userToken);
    const accessToken = userToken == null ? '' : objUser.accessToken;
    if (accessToken) {
      return true;
    }
    this.router.navigateByUrl('/auth/login');
    return false;
  }
}
