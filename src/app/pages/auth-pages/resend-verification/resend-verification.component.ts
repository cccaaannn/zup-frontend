import { Component, ViewChild, ElementRef  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/services/api/account.service';
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

	@ViewChild('formElement') formElement!: ElementRef;

	form: FormGroup = new FormGroup({
		email: new FormControl('')
	});

	submit() {
		this.formElement?.nativeElement.classList.add("was-validated");
		
		if (!this.form.valid) {
			this.snackBar.open('Please enter a correct email', 'X', {
				duration: 3000
			});
			return;
		}

		this.accountService.sendVerifyAccountEmail(this.form.value).subscribe({
			next: (res: any) => {
				this.form.setValue({ email: "" });
				this.snackBar.open('Email will sent', 'X', {
					duration: 3000
				});
			},
			error: (err: any) => {
				this.snackBar.open(err.error.message, 'X', {
					duration: 3000
				});
			},
		})
	}
}
