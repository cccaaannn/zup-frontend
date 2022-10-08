import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';


@Injectable({
	providedIn: 'root'
})
export class WebsocketService {

	private websocketUrl: string = environment.messageServiceWebsocketUrl + "/ws";
	connectionStatus: Subject<boolean> = new BehaviorSubject(false);
	socket: any;

	constructor(private storageService: StorageService, private snackBar: MatSnackBar) {
		if(!this.socket) {
			this.initWebsocket();
		}
	}

	/*
	 * Initializes the websocket connection with the token.
	 * Function requires the access token to operate.
	 * Updates connectionStatus
	*/
	initWebsocket(): void {
		const token: string | null = this.storageService.getToken();
		if (!token || token == null) {
			this.snackBar.open('Failed to connect to websocket, there is no token', 'X', {
				duration: 3000
			});
			this.connectionStatus.next(false);
		}

		const url: string = `${this.websocketUrl}/${token}`

		// TODO handle invalid or expired token
		this.socket = webSocket(url);

		this.connectionStatus.next(true);
	}

	getWebsocket(): Observable<any> {
		return this.socket;
	}

	closeWebsocket(): void {
		this.connectionStatus.next(false);
		this.socket.complete();
	}

	/*
	 * Returns current connection status as an observable.
	*/
	isConnected(): Observable<boolean> {
		return this.connectionStatus;
	}

}
