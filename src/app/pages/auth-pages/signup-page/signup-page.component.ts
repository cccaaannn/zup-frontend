import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/data/enums/routes';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { RouteService } from 'src/app/shared/services/route.service';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/ConfirmPasswordValidator';

@Component({
	selector: 'zup-signup-page',
	templateUrl: './signup-page.component.html',
	styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {

	constructor(
		private router: Router,
		private snackBar: MatSnackBar,
		private authService: AuthService,
		public routeService: RouteService
	) { }

	@ViewChild('formElement') formElement!: ElementRef;

	form: FormGroup = new FormGroup({
		email: new FormControl(''),
		username: new FormControl(''),
		password: new FormControl(''),
		confirmPassword: new FormControl('')
	},
		[
			ConfirmPasswordValidator.validate("password", "confirmPassword")
		]
	);

	submit() {
		this.formElement?.nativeElement.classList.add("was-validated");

		if (!this.form.valid) {
			this.snackBar.open('Please fill required fields', 'X', {
				duration: 3000
			});
			return;
		}
		
		this.authService.signup(this.form.value).subscribe({
			next: (res: any) => {
				console.log(res);
				this.router.navigate([AppRoutes.LOGIN]);
			},
			error: (err: any) => {
				console.log(err);
				this.snackBar.open(this.formatErrors(err.error.errors), 'X', {
					duration: 3000
				});
			},
		})

	}

	formatErrors(errors: any): string {
		let errorsStr = "";
		for (const key in errors) {
			errorsStr += key + ": {" + errors[key] + "} ";
		}
		return errorsStr;
	}

}
