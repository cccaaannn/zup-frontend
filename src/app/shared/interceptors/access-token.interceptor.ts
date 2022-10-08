import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
	providedIn: 'root'
})
export class AccessTokenInterceptor {
	constructor(private storageService: StorageService, private router: Router) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		console.info(`Requesting url: ${request.url}`);

		if (request.url.endsWith('login')) {
			return next.handle(request);
		}

		const token = this.storageService.getToken();
		if (token && token != null) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ` + token,
				},
			});
		} 
		else {
			this.router.navigate(['login']);
		}
		
		return next.handle(request);

	}
}
