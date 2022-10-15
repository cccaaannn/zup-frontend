import { Component, Input } from '@angular/core';
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
	theme: MessageBubbleComponentTheme = { color: "black", backgroundColor: "#00b73d" }

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

}

export interface MessageBubbleComponentTheme {
	backgroundColor: string,
	color: string
}
