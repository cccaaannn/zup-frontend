import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MessageService {

	private apiUrl: string = environment.messageServiceApiUrl + "/message/";

	constructor(private httpClient: HttpClient) { }

	getConversation(toId: number, page?: number, size?: number): Observable<any> {
		return this.httpClient.get<any>(`${this.apiUrl}conversation/${toId}?size=${size || 10}&page=${page || 1}`);
	}

	send(message: any): Observable<any> {
		return this.httpClient.post<any>(this.apiUrl + "send", message);
	}

}
