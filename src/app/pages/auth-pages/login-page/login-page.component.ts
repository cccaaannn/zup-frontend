import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/data/enums/routes';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { WebsocketService } from 'src/app/shared/services/api/websocket.service';
import { RouteService } from 'src/app/shared/services/route.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { RequestHelpers } from 'src/app/shared/utils/request-helpers';

@Component({
	selector: 'zup-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

	constructor(
		private authService: AuthService,
		private storageService: StorageService,
		private router: Router,
		private snackBar: MatSnackBar,
		private websocketService: WebsocketService,
		public routeService: RouteService
	) { }

	@ViewChild('formElement') formElement!: ElementRef;
	isRememberMe: boolean = false;

	form: FormGroup = new FormGroup({
		username: new FormControl(''),
		password: new FormControl(''),
	});

	ngOnInit(): void {
		// Set username if it is saved before
		const userName = this.storageService.getRememberMe();
		if(userName != null) {
			this.isRememberMe = true;
			this.form.setValue({
				username: userName,
				password: ""
			})
		}
	}

	toggleRememberMe() {
		this.isRememberMe = !this.isRememberMe;
		if(!this.isRememberMe) {
			this.storageService.removeRememberMe();
		}
	}

	submit() {
		this.formElement?.nativeElement.classList.add("was-validated");

		if (!this.form.valid) {
			this.snackBar.open('Please fill required fields', 'X', {
				duration: 3000
			});
			return;
		}
		this.authService.login(this.form.value).subscribe({
			next: (res: any) => {
				const token: string = res.data.token;

				this.storageService.saveToken(token);

				// Save username if remember me selected.
				if(this.isRememberMe) {
					this.storageService.saveRememberMe(this.form.value.username);
				}

				// Start listening for real time messages
				this.websocketService.initWebsocket();

				this.router.navigate([AppRoutes.SEARCH_USER]);
			},
			error: (err: any) => {
				if (RequestHelpers.is4XX(err.status)) {
					this.snackBar.open(err.error.message, 'X', {
						duration: 3000
					});
				}
				if (RequestHelpers.is5XX(err.status)) {
					this.snackBar.open('Server error not intercepted', 'X', {
						duration: 3000
					});
				}
			},
		})
	}


}
