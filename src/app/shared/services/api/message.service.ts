import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResult } from 'src/app/shared/data/models/results/DataResult';
import { environment } from 'src/environments/environment';
import { MessageModel } from '../../data/models/message.model';
import { Result } from '../../data/models/results/Result';

@Injectable({
	providedIn: 'root'
})
export class MessageService {

	private apiUrl: string = environment.messageServiceApiUrl + "/messages/";

	constructor(private httpClient: HttpClient) { }

	getConversation(toId: number, page?: number, size?: number): Observable<DataResult<MessageModel>> {
		return this.httpClient.get<DataResult<MessageModel>>(`${this.apiUrl}conversation/${toId}?size=${size || 15}&page=${page || 1}`);
	}

	send(message: MessageModel): Observable<Result> {
		return this.httpClient.post<Result>(this.apiUrl + "send", message);
	}

	setAsRead(id: number): Observable<Result> {
		return this.httpClient.put<Result>(this.apiUrl + "read/" + id, {});
	}

	setAllAsRead(userId: number): Observable<Result> {
		return this.httpClient.put<Result>(this.apiUrl + "read-all?userId=" + userId, {});
	}

}
