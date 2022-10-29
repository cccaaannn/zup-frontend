import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { JwtService } from '../jwt.service';
import { StorageService } from '../storage.service';


@Injectable({
	providedIn: 'root'
})
export class WebsocketService {

	private websocketUrl: string = environment.messageServiceWebsocketUrl + "/ws";
	connectionStatus: Subject<boolean> = new BehaviorSubject(false);
	socket: any;

	constructor(private storageService: StorageService, private snackBar: MatSnackBar, private jwtService: JwtService) {
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

		// Check for e expired token before connection.
		if(this.jwtService.isExpired()) {
			console.log("token is expired socket not connected");
			this.connectionStatus.next(false);
			return;
		}

		this.socket = webSocket(url);

		this.connectionStatus.next(true);
	}

	getWebsocket(): Observable<BehaviorSubject<boolean>> {
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
