import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

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
		private websocketService: WebsocketService
		) { }

	form: FormGroup = new FormGroup({
		email: new FormControl(''),
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

					this.router.navigate(["/search-user"]);
				},
				error: (err: any) => {
					console.log(err);
					this.snackBar.open('Username or password is incorrect', 'X', {
						duration: 3000
					});
				},
			})
		}
	}


}
