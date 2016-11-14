import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let at = localStorage.getItem('is_admin');

        if(at === null) {
            return false;
        }

        if(at === 'false') {
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }
}