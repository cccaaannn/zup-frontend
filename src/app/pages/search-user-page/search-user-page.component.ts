import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/data/enums/routes';
import { UserService } from 'src/app/shared/services/api/user.service';
import { UserModel } from 'src/app/shared/data/models/user.model';
import { DataResult } from 'src/app/shared/data/models/results/DataResult';
import { UserCardEvent } from 'src/app/shared/data/types/user-card-event';
import { MessageService } from 'src/app/shared/services/api/message.service';
import { MessageCountModel } from 'src/app/shared/data/models/message-count';
import { RealtimeMessageService } from 'src/app/shared/services/api/realtime-message.service';
import { MessageModel } from 'src/app/shared/data/models/message.model';
import { debounceTime } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
	selector: 'zup-search-user-page',
	templateUrl: './search-user-page.component.html',
	styleUrls: ['./search-user-page.component.scss']
})
export class SearchUserPageComponent implements OnInit {

	constructor(
		private userService: UserService,
		private messageService: MessageService,
		private router: Router,
		private snackBar: MatSnackBar,
		private sessionService: SessionService,
		private realtimeMessageService: RealtimeMessageService
	) { }

	form: FormGroup = new FormGroup({
		username: new FormControl('')
	});

	usersFriends: UserModel[] = []
	usersNonFriends: UserModel[] = []
	unreadMessages: { [fromId: string]: UnreadMessageDetail } = {}

	ngOnInit(): void {
		this.fillPage();

		// Listen incoming messages to refresh the page for unread messages, debounce time is used for throttling the requests.
		this.realtimeMessageService.getRealtimeMessages()
			.pipe(debounceTime(1000)).subscribe({
				next: (message: MessageModel) => {
					console.debug("Fetch search page");
					this.fillPage();
				}
			})
	}


	fillPage() {
		this.userService.getAllFriends().subscribe({
			next: (userFriends: DataResult<UserModel[]>) => {
				console.debug(userFriends);
				this.usersFriends = userFriends.data;

				this.messageService.getUnreadMessageCount().subscribe({
					next: (unreadMessages: DataResult<MessageCountModel[]>) => {
						console.debug(unreadMessages);
						// Flatten data
						this.unreadMessages = unreadMessages.data.reduce((a, v) => ({ ...a, [v.fromId]: { messageCount: v.count, isFriend: false } }), {});

						// Separate non friends and friends
						for (const friend of this.usersFriends) {
							if (this.unreadMessages[friend.id]) {
								this.unreadMessages[friend.id].isFriend = true;
							}
						}

						// Get non friend users from unread messages list to show messages received from non friend users. 
						const nonFriendIds: number[] = []
						for (const key in this.unreadMessages) {
							if (!this.unreadMessages[key].isFriend) {
								nonFriendIds.push(parseInt(key));
							}
						}
						if (nonFriendIds.length != 0) {
							this.userService.getAllByIds(nonFriendIds).subscribe({
								next: (nonFriendUsers: DataResult<any>) => {
									console.debug(nonFriendUsers, "non friend users");
									this.usersNonFriends = nonFriendUsers.data.content;
								}
							})
						}

					}
				})

			}
		})
	}



	getUnreadMessageCount(userId: number): number {
		if (this.unreadMessages[userId]) {
			return this.unreadMessages[userId].messageCount;
		}
		return 0;
	}

	submit() {
		if (this.form.valid) {
			this.userService.getByUsername(this.form.value.username).subscribe({
				next: (res: any) => {
					console.log(res);
					this.router.navigate([AppRoutes.MESSAGES], { queryParams: { user: res.data.id } });
				},
				error: (err: any) => {
					console.log(err);
					this.snackBar.open('user not found', 'X', {
						duration: 3000
					});
				}
			})
		}
	}

	onLogout() {
		this.sessionService.logout();
	}


	onUserCardClick(event: UserCardEvent) {
		console.debug(event);
		this.router.navigate([AppRoutes.MESSAGES], { queryParams: { user: event.user.id } });
	}

}

interface UnreadMessageDetail {
	messageCount: number,
	isFriend: boolean
}