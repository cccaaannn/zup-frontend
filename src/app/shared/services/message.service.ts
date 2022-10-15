import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResult } from 'src/app/data/models/DataResult';
import { MessageModel } from 'src/app/data/models/message.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MessageService {

	private apiUrl: string = environment.messageServiceApiUrl + "/messages/";

	constructor(private httpClient: HttpClient) { }

	getConversation(toId: number, page?: number, size?: number): Observable<any> {
		return this.httpClient.get<any>(`${this.apiUrl}conversation/${toId}?size=${size || 12}&page=${page || 1}`);
	}

	send(message: any): Observable<any> {
		return this.httpClient.post<any>(this.apiUrl + "send", message);
	}

}
