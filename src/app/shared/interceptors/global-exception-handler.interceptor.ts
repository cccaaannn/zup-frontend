import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { RequestHelpers } from '../utils/request-helpers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InterceptorConstants } from '../data/enums/interceptor-constants';

@Injectable()
export class GlobalExceptionHandlerInterceptor implements HttpInterceptor {

	constructor(private snackBar: MatSnackBar) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				const BYPASS_INTERCEPTOR = request.headers.get(InterceptorConstants.BYPASS_INTERCEPTOR) == null ? false: true;
				const INTERCEPT_4XX = request.headers.get(InterceptorConstants.INTERCEPT_4XX);

				if(BYPASS_INTERCEPTOR) {
					console.debug(`Interceptor is not handling error with status code ${error.status} ('${InterceptorConstants.BYPASS_INTERCEPTOR}' activated for this request)`);
					return throwError(() => error);
				}

				if (error.status == 0) {
					console.debug(`Intercepting error with status code ${error.status}`);
					this.snackBar.open('Server connection lost.', 'X', {
						duration: 3000
					});
					return EMPTY;
				}
				if (RequestHelpers.is5XX(error.status)) {
					console.debug(`Intercepting error with status code ${error.status}`);
					this.snackBar.open('Server error.', 'X', {
						duration: 3000
					});
					return EMPTY
				}
				if (INTERCEPT_4XX != null && RequestHelpers.is4XX(error.status)) {
					console.debug(`Intercepting error with status code ${error.status} ('${InterceptorConstants.INTERCEPT_4XX}' activated for this request)`);
					this.snackBar.open(INTERCEPT_4XX, 'X', {
						duration: 3000
					});
					return EMPTY
				}

				console.debug(`Interceptor is not handling client error with status code ${error.status}`);
				return throwError(() => error);
			})
		) as Observable<HttpEvent<any>>;
	}
}
