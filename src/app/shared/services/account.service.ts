import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessTokenModel } from '../data/models/access-token.model';
import { PasswordResetModel } from '../data/models/password-reset.model';
import { Result } from '../data/models/results/Result';
import { UserEmailModel } from '../data/models/user-email.model';

@Injectable({
	providedIn: 'root'
})
export class AccountService {

	private apiUrl: string = environment.userServiceApiUrl + "/account/";

	constructor(private httpClient: HttpClient) { }

	sendVerifyAccountEmail(userEmailModel: UserEmailModel): Observable<Result> {
		return this.httpClient.post<any>(`${this.apiUrl}send-verification`, userEmailModel);
	}

	verifyAccount(accessTokenModel: AccessTokenModel): Observable<Result> {
		return this.httpClient.post<any>(`${this.apiUrl}verify`, accessTokenModel);
	}

	sendForgetPasswordEmail(userEmailModel: UserEmailModel): Observable<Result> {
		return this.httpClient.post<any>(`${this.apiUrl}password/send-reset`, userEmailModel);
	}

	resetPassword(passwordResetModel: PasswordResetModel): Observable<Result> {
		return this.httpClient.post<any>(`${this.apiUrl}password/reset`, passwordResetModel);
	}

}
