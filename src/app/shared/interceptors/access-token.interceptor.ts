import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { AppRoutes } from '../data/enums/routes';
import { JwtService } from '../services/jwt.service';
import { StorageService } from '../services/storage.service';
import { ApiUtils } from '../utils/api-utils';

@Injectable({
	providedIn: 'root'
})
export class AccessTokenInterceptor {

	constructor(private storageService: StorageService, private jwtService: JwtService, private router: Router, private snackBar: MatSnackBar) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		console.info(`Intercepting request: ${request.url}`);

		if (ApiUtils.isUnguardedApiPath(request.url)) {
			console.info("Unguarded api request");
			return next.handle(request);
		}

		// undefined or null tokens are also considered expired.
		if (this.jwtService.isExpired()) {
			this.router.navigate([AppRoutes.LOGIN]);
			this.snackBar.open('Your session is expired.', 'X', {
				duration: 3000
			});
			return EMPTY;
		}

		const token = this.storageService.getToken();
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ` + token,
			},
		});

		return next.handle(request);
	}

}
