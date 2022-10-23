import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutes } from '../data/enums/routes';
import { JwtService } from '../services/jwt.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private jwtService: JwtService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if(this.jwtService.getDecodedToken() != null) {
			return true;
		}
		this.router.navigate([AppRoutes.LOGIN]);
		return false;
	}

}
