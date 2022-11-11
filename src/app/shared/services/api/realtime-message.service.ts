import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, retry, tap } from 'rxjs';
import { MessageModel } from '../../data/models/message.model';
import { UserService } from './user.service';
import { WebsocketService } from './websocket.service';


@Injectable({
	providedIn: 'root'
})
export class RealtimeMessageService {

	constructor(private websocketService: WebsocketService, private snackBar: MatSnackBar, private userService: UserService) {
		this.websocketService.isConnected().subscribe({
			next: (isConnected: boolean) => {
				if (isConnected) {
					this.listenIncomingMessages();
				}
			}
		})
	}

	/*
	 * Parses raw websocket message to MessageModel.
	*/
	getRealtimeMessages(): Observable<MessageModel> {
		return this.websocketService.getWebsocket().pipe(
			retry({ delay: 1000 }),
			map((message: any) => {
				return JSON.parse(message)
			})
		);
	}

	/*
	 * listens incoming realtime messages, and displays them on snackbar.
	*/
	private listenIncomingMessages() {
		this.websocketService.getWebsocket().pipe(
			retry({ delay: 1000 })
		).subscribe({
			next: (msg: any) => {
				const message: MessageModel = JSON.parse(msg);
				console.debug(message);

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
			error: (err: any) => {
				console.error(err);
				this.snackBar.open('Server disconnected', 'X', {
					duration: 3000
				});
			},
			complete: () => {
				this.snackBar.open('Server closed the connection', 'X', {
					duration: 3000
				});
			}
		});
	}

}
