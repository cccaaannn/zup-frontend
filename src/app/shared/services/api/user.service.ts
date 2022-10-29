import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataResult } from '../../data/models/results/DataResult';
import { Result } from '../../data/models/results/Result';
import { UserModel } from '../../data/models/user.model';


@Injectable({
	providedIn: 'root'
})
export class UserService {

	private apiUrl: string = environment.userServiceApiUrl + "/users/";

	constructor(private httpClient: HttpClient) { }

	getById(userId: number): Observable<DataResult<UserModel>> {
		return this.httpClient.get<any>(this.apiUrl + userId);
	}

	getByUsername(username: string): Observable<DataResult<UserModel>> {
		return this.httpClient.get<any>(this.apiUrl + "username/" + username);
	}

	activate(userId: number): Observable<Result> {
		return this.httpClient.patch<any>(`${this.apiUrl}${userId}/activate`, {});
	}
	
	suspend(userId: number): Observable<Result> {
		return this.httpClient.patch<any>(`${this.apiUrl}${userId}/suspend`, {});
	}

}
