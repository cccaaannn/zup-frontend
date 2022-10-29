import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/shared/data/models/login.model';
import { environment } from 'src/environments/environment';
import { AccessTokenModel } from '../../data/models/access-token.model';
import { DataResult } from '../../data/models/results/DataResult';
import { Result } from '../../data/models/results/Result';
import { SignupModel } from '../../data/models/signup.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private apiUrl: string = environment.userServiceApiUrl + "/auth/";

	constructor(private httpClient: HttpClient) { }

	login(loginModel: LoginModel): Observable<DataResult<AccessTokenModel>> {
		return this.httpClient.post<DataResult<AccessTokenModel>>(this.apiUrl + "login", loginModel);
	}

	signup(signupModel: SignupModel): Observable<Result> {
		return this.httpClient.post<Result>(this.apiUrl + "signup", signupModel);
	}

}
