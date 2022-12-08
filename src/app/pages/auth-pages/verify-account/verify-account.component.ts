import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/shared/services/api/account.service';
import { RouteService } from 'src/app/shared/services/route.service';

@Component({
	selector: 'zup-verify-account',
	templateUrl: './verify-account.component.html',
	styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

	constructor(
		private accountService: AccountService,
		private route: ActivatedRoute,
		public routeService: RouteService
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
					this.activationStatus = "Account activated successfully";
				},
				error: (err: any) => {
					this.activationStatus = "Account activation failed";
				}
			})
		});
	}

}
