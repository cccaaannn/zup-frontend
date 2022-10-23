import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/data/enums/routes';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
	selector: 'zup-search-user-page',
	templateUrl: './search-user-page.component.html',
	styleUrls: ['./search-user-page.component.scss']
})
export class SearchUserPageComponent {

	constructor(
		private userService: UserService,
		private router: Router,
		private snackBar: MatSnackBar, 
		private storageService: StorageService
	) { }


	form: FormGroup = new FormGroup({
		username: new FormControl('')
	});

	submit() {
		if (this.form.valid) {
			this.userService.getByUsername(this.form.value.username).subscribe({
				next: (res: any) => {
					console.log(res);
					this.router.navigate([AppRoutes.MESSAGES], { queryParams: { user: res.data.id } });
				},
				error: (err: any) => {
					console.log(err);
					this.snackBar.open('user not found', 'X', {
						duration: 3000
					});
				}
			})
		}
	}

	onLogout() {
		this.storageService.removeToken();
		this.router.navigate([AppRoutes.LOGIN]);
	}

}
