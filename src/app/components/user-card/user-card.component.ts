import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserModel } from 'src/app/shared/data/models/user.model';
import { UserCardEvent } from 'src/app/shared/data/types/user-card-event';

@Component({
	selector: 'zup-user-card',
	templateUrl: './user-card.component.html',
	styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

	constructor() { }

	@Input() user!: UserModel;
	@Input() unreadMessageCount: number = 0;
	@Output() userCardEvent: EventEmitter<UserCardEvent> = new EventEmitter<UserCardEvent>();

	onClick() {
		this.userCardEvent.emit({ user: this.user })
	}

}
