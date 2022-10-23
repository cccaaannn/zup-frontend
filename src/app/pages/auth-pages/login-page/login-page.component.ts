import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/data/enums/routes';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RouteService } from 'src/app/shared/services/route.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { RequestHelpers } from 'src/app/shared/utils/request-helpers';

@Component({
	selector: 'zup-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

	constructor(
		private authService: AuthService, 
		private storageService: StorageService,
		private router: Router,
		private snackBar: MatSnackBar, 
		private websocketService: WebsocketService,
		public routeService: RouteService
		) { }

	form: FormGroup = new FormGroup({
		username: new FormControl(''),
		password: new FormControl(''),
	});

	submit() {
		if (this.form.valid) {
			this.authService.login(this.form.value).subscribe({
				next: (res: any) => {
					console.log(res);
					
					const token: string = res.data.token;

					this.storageService.saveToken(token);

					// Start listening for real time messages
					this.websocketService.initWebsocket();

					this.router.navigate([AppRoutes.SEARCH_USER]);
				},
				error: (err: any) => {
					console.log(err);
					if(RequestHelpers.is4XX(err.status)) {
						this.snackBar.open(err.error.message, 'X', {
							duration: 3000
						});
					}
					if(RequestHelpers.is5XX(err.status)) {
						this.snackBar.open('Server error', 'X', {
							duration: 3000
						});
					}
				},
			})
		}
	}


}
