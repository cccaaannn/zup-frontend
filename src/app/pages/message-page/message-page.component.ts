import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';

import { concatMap, filter, map, repeat, Subscription, tap } from 'rxjs';

import { RealtimeMessageService } from 'src/app/shared/services/api/realtime-message.service';
import { UserOnlineStatusModel } from 'src/app/shared/data/models/user-online-status.model';
import { MessageDirection } from 'src/app/shared/data/enums/message-direction';
import { MessageService } from 'src/app/shared/services/api/message.service';
import { DataResult } from 'src/app/shared/data/models/results/DataResult';
import { RequestScroll } from 'src/app/shared/data/types/request-scroll';
import { MessageModel } from 'src/app/shared/data/models/message.model';
import { UserService } from 'src/app/shared/services/api/user.service';
import { RequestHelpers } from 'src/app/shared/utils/request-helpers';
import { isThisYear, isToday } from 'src/app/shared/utils/date-utils';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { AppRoutes } from 'src/app/shared/data/enums/routes';


@Component({
	selector: 'zup-message-page',
	templateUrl: './message-page.component.html',
	styleUrls: ['./message-page.component.scss']
})
export class MessagePageComponent implements OnInit, OnDestroy, AfterViewChecked {

	@ViewChild('infiniteScrollDiv')
	infiniteScrollDiv: ElementRef | undefined;

	// For update current 'to' users online status
	toOnlineStatusSubscription!: Subscription;

	// Conversation messages
	messages: MessageModel[] = [];
	
	// User information
	userId: number = -1;
	toId: number = -1;
	toUsername: string = "";
	toOnlineStatus!: UserOnlineStatusModel;
	isFriend: boolean = false;
	
	// Pagination
	currentPage: number = 1;
	pageSize: number = 10;
	spinner: boolean = false;

	// Message form
	messageForm: FormGroup = new FormGroup({
		messageText: new FormControl('')
	});

	// Scroll object
	requestScroll: RequestScroll = {
		status: true,
		toBottom: true,
		height: 100
	}

	constructor(
		private messageService: MessageService,
		private jwtService: JwtService,
		private snackBar: MatSnackBar,
		private router: Router,
		private realtimeMessageService: RealtimeMessageService,
		private activatedRoute: ActivatedRoute,
		private userService: UserService
	) { }


	// ---------- ---------- Angular lifecycle functions ---------- ----------

	ngOnInit(): void {
		const decodedToken = this.jwtService.getDecodedToken();
		this.userId = decodedToken.data.id;

		this.activatedRoute.queryParams.subscribe({
			next: (params: Params) => {
				console.debug(params);

				const userId = params["user"];
				if (!userId) {
					this.snackBar.open('Invalid user', 'X', {
						duration: 3000
					});
					return;
				}

				this.toId = parseInt(userId);

				// Get user detail
				this.userService.getById(this.toId).subscribe({
					next: (res: any) => {
						console.debug(res);
						this.toUsername = res.data.username;
						this.isFriend = res.data.isFriend;
					},
					error: (err: any) => {
						console.debug(err);
						if (RequestHelpers.is4XX(err.status)) {
							this.snackBar.open('Invalid user', 'X', {
								duration: 3000
							});
						}
						if (RequestHelpers.is5XX(err.status)) {
							this.snackBar.open('Server error', 'X', {
								duration: 3000
							});
						}
					}
				})

				// Get conversation messages
				this.messageService.getConversation(this.toId).subscribe({
					next: (res: any) => {
						console.debug(res);
						this.messages = res.data.content.reverse();
						this.requestScroll = { status: true, toBottom: true, height: 300 }

						// Set all as read
						this.messageService.setAllAsRead(this.toId).subscribe({
							next: (res: any) => {
								console.debug(res);
							}
						})

					},
					error: (err: any) => {
						console.debug(err);
						if (RequestHelpers.is4XX(err.status)) {
							this.snackBar.open('Invalid user', 'X', {
								duration: 3000
							});
						}
						if (RequestHelpers.is5XX(err.status)) {
							this.snackBar.open('Server error', 'X', {
								duration: 3000
							});
						}
					}
				})

				// Start updating to users online status
				this.startUpdatingToOnlineStatus();

				this.realtimeMessageService.getRealtimeMessages().pipe(
					// Filter messages to get only messages on the current conversation 
					filter((message: MessageModel) => {
						return message.fromId == this.toId;
					}),
					// Set incoming message as read
					concatMap((message: MessageModel) => {
						return this.messageService.setAsRead(message.id).pipe(
							tap(readResult => console.debug(readResult)),
							map(() => message)
						)
					}),
					// Get "to" users updated online status 
					concatMap((message: MessageModel) => {
						return this.userService.getOnlineStatus(this.toId).pipe(
							tap(toOnlineStatusResult => console.debug(toOnlineStatusResult)),
							map(toOnlineStatusResult => toOnlineStatusResult.data),
							map((toOnlineStatus) => { return { message: message, toOnlineStatus: toOnlineStatus } })
						)
					})
				).subscribe({
					next: ({ message, toOnlineStatus }: any) => {
						this.messages.push(message);
						this.requestScroll = { status: true, toBottom: true, height: 300 }
						this.toOnlineStatus = { id: toOnlineStatus.id, onlineStatus: toOnlineStatus.onlineStatus, lastOnline: new Date(toOnlineStatus.lastOnline) };
					}
				})

			}
		});

	}

	ngOnDestroy() {
		this.toOnlineStatusSubscription.unsubscribe();
	}

	ngAfterViewChecked() {
		this.scrollTo();
	}

	// ---------- ---------- ---------- ---------- ----------



	// ---------- ---------- Requests ---------- ----------

	onScroll(): void {
		this.spinner = true;
		this.messageService.getConversation(this.toId, ++this.currentPage).subscribe({
			next: (res: any) => {
				console.debug(res);
				this.messages = [...res.data.content.reverse(), ...this.messages];
				this.requestScroll = { status: true, toBottom: false, height: 300 }
				this.spinner = false;
			},
			error: (err: any) => {
				console.debug(err);
				this.spinner = false;
			}
		})
	}

	startUpdatingToOnlineStatus() {
		this.toOnlineStatusSubscription = this.userService.getOnlineStatus(this.toId).pipe(
			repeat({
				delay: 5000
			})
		).subscribe({
			next: (res: DataResult<UserOnlineStatusModel>) => {
				console.debug(res);
				this.toOnlineStatus = { id: res.data.id, onlineStatus: res.data.onlineStatus, lastOnline: new Date(res.data.lastOnline) };
			},
			error: (err: any) => {
				console.debug(err);
			}
		})
	}

	// ---------- ---------- ---------- ---------- ----------



	// ---------- ---------- Utils ---------- ----------

	getMessageDirection(message: MessageModel): MessageDirection {
		if (message.fromId == this.userId) {
			return MessageDirection.OUTGOING;
		}
		return MessageDirection.INCOMING;
	}

	// if message is mine it will be on the right side of the page.
	isMessageOutgoing(message: MessageModel): boolean {
		if (this.getMessageDirection(message) == MessageDirection.OUTGOING) { 
			return true;
		}
		return false;
	}

	getMessageStatus(message: MessageModel) {
		if (this.isMessageOutgoing(message)) {
			return message.messageStatus;
		}
		return 0;
	}

	scrollTo() {
		if (this.requestScroll.status) {
			this.requestScroll.status = false;

			if (!this.infiniteScrollDiv) {
				return;
			}

			if (this.requestScroll.toBottom) {
				this.infiniteScrollDiv.nativeElement.scrollTop = this.infiniteScrollDiv.nativeElement.scrollHeight
				return;
			}

			this.infiniteScrollDiv.nativeElement.scrollTop = this.infiniteScrollDiv.nativeElement.scrollTop + this.requestScroll.height;
			return;
		}
	}

	getLastOnlineDatePipeFormat(date: Date) {
		if (!isThisYear(date)) {
			return "MM d, y, h:mm"
		}
		if (isToday(date)) {
			return "h:mm"
		}
		return "MM d, h:mm"
	}

	// ---------- ---------- ---------- ---------- ----------



	// ---------- ---------- Event functions ---------- ----------

	onBack() {
		this.router.navigate([AppRoutes.SEARCH_USER]);
	}

	onFriend() {
		this.userService.toggleFriend(this.toId).subscribe({
			next: (res: any) => {
				console.debug(res);
				this.userService.getById(this.toId).subscribe({
					next: (res: any) => {
						console.debug(res);
						this.isFriend = res.data.isFriend;
					},
					error: (err: any) => {
						console.debug(err);
					}
				})
			}
		})
	}

	onSend() {
		if (!this.messageForm.valid) {
			this.snackBar.open('Please type a message', 'X', {
				duration: 3000
			});
			return
		}

		const message: any = {
			id: 0,
			toId: this.toId,
			messageStatus: 0,
			fromId: this.userId,
			messageText: this.messageForm.value.messageText,
			createdAt: null
		}

		this.messageService.send(message).subscribe({
			next: (res: any) => {
				// Don't push self messages to prevent duplicate view
				if (this.userId != this.toId) {
					this.messages.push(res);
				}
				this.requestScroll = { status: true, toBottom: true, height: 300 }
				this.messageForm.setValue({ messageText: "" });
			},
			error: (err: any) => {
				console.debug(err);
				this.snackBar.open('Failed to send message', 'X', {
					duration: 3000
				});
			}
		});
	}

	// ---------- ---------- ---------- ---------- ----------

}
