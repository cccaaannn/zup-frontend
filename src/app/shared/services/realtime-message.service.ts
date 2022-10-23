import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { MessageModel } from '../data/models/message.model';
import { UserService } from './user.service';
import { WebsocketService } from './websocket.service';


@Injectable({
	providedIn: 'root'
})
export class RealtimeMessageService {

	constructor(private websocketService: WebsocketService, private snackBar: MatSnackBar, private userService: UserService) { 
		this.websocketService.isConnected().subscribe({
			next: (isConnected: boolean) => {
				if(isConnected) {
					this.listenIncomingMessages();
				}
			}
		})
	}

	/*
	 * Parses raw websocket message to MessageModel.
	*/
	getRealtimeMessages(): Observable<MessageModel> {
		return this.websocketService.getWebsocket().pipe(map(
			(message: any) => {
				return JSON.parse(message)
			}
		));
	}

	/*
	 * listens incoming realtime messages, and displays them on snackbar.
	*/
	listenIncomingMessages() {
		this.websocketService.getWebsocket().subscribe({
			next: (msg: any) => {
				const message: MessageModel = JSON.parse(msg);
				console.log(message);

				this.userService.getById(message.fromId).subscribe({
					next: (res: any) => {
						console.log(res);
						const senderUsername: string = res.data.username;
						this.snackBar.open(`${senderUsername}: ${message.messageText}`, 'X', {
							horizontalPosition: "left",
							verticalPosition: "bottom",
							duration: 3000
						});
					}
				})
			},
			error: (err: any) => console.log(err),
			complete: () => console.log('CONNECTION CLOSED')
		});
	}

}
