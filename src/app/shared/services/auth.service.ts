import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/data/models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private apiUrl: string = environment.userServiceApiUrl + "/auth/";

	constructor(private httpClient: HttpClient) { }

	login(loginModel: LoginModel): Observable<any> {
		return this.httpClient.post<any>(this.apiUrl + "login", loginModel);
	}

}
