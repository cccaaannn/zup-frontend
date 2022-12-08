import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/data/enums/routes';
import { AccountService } from 'src/app/shared/services/api/account.service';
import { RouteService } from 'src/app/shared/services/route.service';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/ConfirmPasswordValidator';

@Component({
	selector: 'zup-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private snackBar: MatSnackBar,
		private accountService: AccountService,
		public routeService: RouteService
	) { }

	@ViewChild('formElement') formElement!: ElementRef;

	token: string = "";

	form: FormGroup = new FormGroup({
		password: new FormControl(''),
		confirmPassword: new FormControl('')
	},
		[
			ConfirmPasswordValidator.validate("password", "confirmPassword")
		]
	);

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.token = params['token'];
		});
	}

	submit() {
		this.formElement?.nativeElement.classList.add("was-validated");
		
		if (!this.form.valid) {
			this.snackBar.open('Please fill required fields', 'X', {
				duration: 3000
			});
			return;
		}

		const body = {
			password: this.form.value.password,
			accessToken: { token: this.token }
		}

		this.accountService.resetPassword(body).subscribe({
			next: (res: any) => {
				this.snackBar.open(this.formatErrors("Password change successful"), 'X', {
					duration: 3000
				});
				this.router.navigate([AppRoutes.LOGIN]);
			},
			error: (err: any) => {
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
