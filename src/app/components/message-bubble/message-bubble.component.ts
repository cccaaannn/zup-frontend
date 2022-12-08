import { Component, Input } from '@angular/core';
import { MessageDirection } from 'src/app/shared/data/enums/message-direction';
import { isThisYear, isToday } from 'src/app/shared/utils/date-utils';

@Component({
	selector: 'zup-message-bubble',
	templateUrl: './message-bubble.component.html',
	styleUrls: ['./message-bubble.component.scss']
})
export class MessageBubbleComponent {

	@Input()
	messageText: string = "";

	@Input()
	messageDate: string = "";

	@Input()
	messageStatus: number = 0;

	@Input()
	messageDirection: MessageDirection = MessageDirection.OUTGOING;

	@Input()
	theme!: MessageBubbleComponentTheme;

	incomingMessageTheme: MessageBubbleComponentTheme = { color: "black", backgroundColor: "#00b771" };
	outgoingMessageTheme: MessageBubbleComponentTheme = { color: "black", backgroundColor: "#008cb7" };


	constructor() { }

	formatDate(): string {
		const date: Date = new Date(Date.parse(this.messageDate));
		
		if(isToday(date)) {
			return date.toLocaleTimeString('tr-TR').substring(0, 5);
		}
		
		if(isThisYear(date)) {
			return `${date.toLocaleDateString('tr-TR').substring(0, 5)} - ${date.toLocaleTimeString('tr-TR').substring(0, 5)}`; 
		}

		return `${date.toLocaleDateString('tr-TR')} - ${date.toLocaleTimeString('tr-TR').substring(0, 5)}`;
	}

	getMessageBubbleColor() {
		if(this.theme) {
			return {'color': this.theme.color, 'background-color': this.theme.backgroundColor};
		}

		if (this.messageDirection == MessageDirection.INCOMING) {
			return {'color': this.incomingMessageTheme.color, 'background-color': this.incomingMessageTheme.backgroundColor};
		}
		return {'color': this.outgoingMessageTheme.color, 'background-color': this.outgoingMessageTheme.backgroundColor};
	}

}

export interface MessageBubbleComponentTheme {
	backgroundColor: string,
	color: string
}
