import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/services/account.service';
import { RouteService } from 'src/app/shared/services/route.service';

@Component({
	selector: 'zup-resend-verification',
	templateUrl: './resend-verification.component.html',
	styleUrls: ['./resend-verification.component.scss']
})
export class ResendVerificationComponent {

	constructor(
		private snackBar: MatSnackBar,
		private accountService: AccountService,
		public routeService: RouteService
	) { }

	form: FormGroup = new FormGroup({
		email: new FormControl('')
	});

	submit() {
		if (!this.form.valid) {
			this.snackBar.open('Please enter a correct email', 'X', {
				duration: 3000
			});
			return;
		}

		this.accountService.sendVerifyAccountEmail(this.form.value).subscribe({
			next: (res: any) => {
				console.log(res);
				this.form.setValue({ email: "" });
				this.snackBar.open('Email will sent', 'X', {
					duration: 3000
				});
			},
			error: (err: any) => {
				console.log(err);
				this.snackBar.open(err.error.message, 'X', {
					duration: 3000
				});
			},
		})
	}
}
