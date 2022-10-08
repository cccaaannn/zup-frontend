import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/data/models/login.model';
import { environment } from 'src/environments/environment';


@Injectable({
	providedIn: 'root'
})
export class UserService {

	private apiUrl: string = environment.userServiceApiUrl + "/user/";

	constructor(private httpClient: HttpClient) { }

	getById(userId: number): Observable<any> {
		return this.httpClient.get<any>(this.apiUrl + userId);
	}

	getByUsername(username: string): Observable<any> {
		return this.httpClient.get<any>(this.apiUrl + "username/" + username);
	}

}
