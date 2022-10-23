import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResult } from 'src/app/shared/data/models/results/DataResult';
import { environment } from 'src/environments/environment';
import { MessageModel } from '../data/models/message.model';
import { Result } from '../data/models/results/Result';

@Injectable({
	providedIn: 'root'
})
export class MessageService {

	private apiUrl: string = environment.messageServiceApiUrl + "/messages/";

	constructor(private httpClient: HttpClient) { }

	getConversation(toId: number, page?: number, size?: number): Observable<DataResult<MessageModel>> {
		return this.httpClient.get<any>(`${this.apiUrl}conversation/${toId}?size=${size || 12}&page=${page || 1}`);
	}

	send(message: any): Observable<Result> {
		return this.httpClient.post<any>(this.apiUrl + "send", message);
	}

}
