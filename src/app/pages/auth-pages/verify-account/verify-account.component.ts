import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
	selector: 'zup-verify-account',
	templateUrl: './verify-account.component.html',
	styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

	constructor(
		private accountService: AccountService,
		private route: ActivatedRoute
	) { }

	activationStatus: string = "Activating account";

	ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			const token = params['token'];

			if(!token) {
				this.activationStatus = "Account activation failed, token malformed";
				return;
			}

			this.accountService.verifyAccount({ token: token }).subscribe({
				next: (result: any) => {
					console.log(result);
					this.activationStatus = "Account activated successfully";
				},
				error: (err: any) => {
					console.log(err);
					this.activationStatus = "Account activation failed";
				}
			})
		});
	}

}