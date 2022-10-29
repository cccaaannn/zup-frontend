import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/data/enums/routes';
import { MessageModel } from 'src/app/shared/data/models/message.model';
import { RequestScroll } from 'src/app/shared/data/types/request-scroll';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { MessageService } from 'src/app/shared/services/api/message.service';
import { RealtimeMessageService } from 'src/app/shared/services/api/realtime-message.service';
import { UserService } from 'src/app/shared/services/api/user.service';

@Component({
	selector: 'zup-message-page',
	templateUrl: './message-page.component.html',
	styleUrls: ['./message-page.component.scss']
})
export class MessagePageComponent implements OnInit, AfterViewChecked {

	@ViewChild('infiniteScrollDiv') 
	infiniteScrollDiv: ElementRef | undefined;

	messages: MessageModel[] = [];
	userId: number = -1;
	toId: number = 2;
	toUsername: string = "";
	currentPage: number = 1;
	pageSize: number = 10;
	spinner: boolean = false;

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

	ngOnInit(): void {
		const decodedToken = this.jwtService.getDecodedToken();
		this.userId = decodedToken.id;

		this.activatedRoute.queryParams.subscribe({
			next: (params: Params) => {
				console.log(params);

				const userId = params["user"];
				if (!userId) {
					this.snackBar.open('Invalid user', 'X', {
						duration: 3000
					});
					return;
				}

				this.toId = parseInt(userId);


				this.userService.getById(this.toId).subscribe({
					next: (res: any) => {
						console.log(res);
						this.toUsername = res.data.username;
					}
				})

				this.messageService.getConversation(this.toId).subscribe({
					next: (res: any) => {
						console.log(res);
						this.messages = res.data.content.reverse();
						this.requestScroll = { status: true, toBottom: true, height: 300 }
					}
				})

				this.realtimeMessageService.getRealtimeMessages().subscribe({
					next: (message: MessageModel) => {
						// If incoming realtime message is coming from the the user that we are currently talking, insert the new message to the page. 
						if (message.fromId == this.toId) {
							this.messages.push(message);
							this.requestScroll = { status: true, toBottom: true, height: 300 }
						}
					}
				});

			}
		});


	}

	ngAfterViewChecked() {
		this.scrollTo();
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


	getMessageBubbleColor(message: MessageModel) {
		if(this.isMessageBelongsToCurrentUser(message)) {
			return { color: "black", backgroundColor: "#00b771" }
		}
		return { color: "black", backgroundColor: "#008cb7" }
	}

	isMessageBelongsToCurrentUser(message: MessageModel): boolean {
		if (message.fromId == this.userId) { // if message is mine it will be on the right side of the page.
			return true;
		}
		return false;
	}


	onScroll(): void {
		this.spinner = true;
		this.messageService.getConversation(this.toId, ++this.currentPage).subscribe({
			next: (res: any) => {
				console.log(res);
				this.messages = [...res.data.content.reverse(), ...this.messages];
				this.requestScroll = { status: true, toBottom: false, height: 300 }
				this.spinner = false;
			},
			error: (err: any) => {
				console.log(err);
				this.spinner = false;
			}
		})
	}

	onBack() {
		this.router.navigate([AppRoutes.SEARCH_USER]);
	}

	messageForm: FormGroup = new FormGroup({
		messageText: new FormControl('')
	});

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
				this.messages.push(res);
				this.requestScroll = { status: true, toBottom: true, height: 300 }
				this.messageForm.setValue({ messageText: "" });
			},
			error: (err: any) => {
				console.log(err);
				this.snackBar.open('Failed to send message', 'X', {
					duration: 3000
				});
			}
		});
	}

}




