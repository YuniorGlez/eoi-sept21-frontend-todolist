import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

    if (localStorage.getItem('token')) {
      return this.authService.getCurrentUser()
        .then(user => {
          if (user === null) { 
            return this.router.navigateByUrl('/login') 
          
          }
          else {
            return true;
          }
        })
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }

  }

}
