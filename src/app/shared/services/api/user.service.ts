import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../../data/models/pagination';
import { DataResult } from '../../data/models/results/DataResult';
import { Result } from '../../data/models/results/Result';
import { UserOnlineStatusModel } from '../../data/models/user-online-status.model';
import { UserModel } from '../../data/models/user.model';


@Injectable({
	providedIn: 'root'
})
export class UserService {

	private apiUrl: string = environment.userServiceApiUrl + "/users/";

	constructor(private httpClient: HttpClient) { }

	getAll(page?: number, size?: number, sort?: string, order?: string): Observable<DataResult<Pagination<UserModel[]>>> {
		return this.httpClient.get<DataResult<Pagination<UserModel[]>>>(`${this.apiUrl}?page=${page || 0}&size=${size || 10}&sort=${sort || "id"}&order=${order || "desc"}`);
	}

	getAllByIds(ids: number[], sort?: string, order?: string): Observable<DataResult<Pagination<UserModel[]>>> {
		return this.httpClient.get<DataResult<Pagination<UserModel[]>>>(`${this.apiUrl}?size=${ids.length}&sort=${sort || "id"}&order=${order || "desc"}&ids=${ids}`);
	}

	getById(userId: number): Observable<DataResult<UserModel>> {
		return this.httpClient.get<DataResult<UserModel>>(this.apiUrl + userId);
	}

	getByUsername(username: string): Observable<DataResult<UserModel>> {
		return this.httpClient.get<DataResult<UserModel>>(this.apiUrl + "username/" + username);
	}

	activate(userId: number): Observable<Result> {
		return this.httpClient.patch<Result>(`${this.apiUrl}${userId}/activate`, {});
	}
	
	suspend(userId: number): Observable<Result> {
		return this.httpClient.patch<Result>(`${this.apiUrl}${userId}/suspend`, {});
	}

	
	getAllFriends(): Observable<DataResult<UserModel[]>> {
		return this.httpClient.get<DataResult<UserModel[]>>(this.apiUrl + "friends");
	}

	toggleFriend(userId: number): Observable<Result> {
		return this.httpClient.put<Result>(this.apiUrl + "friends/toggle", { userFriendId: userId });
	}


	getOnlineStatus(userId: number): Observable<DataResult<UserOnlineStatusModel>> {
		return this.httpClient.get<DataResult<UserOnlineStatusModel>>(`${this.apiUrl}${userId}/online-status`);
	}

}
