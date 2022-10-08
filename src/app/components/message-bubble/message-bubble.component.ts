import { Component, Input } from '@angular/core';

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
		return date.toLocaleTimeString('tr-TR').substring(0, 5);
	}

}

export interface MessageBubbleComponentTheme {
	backgroundColor: string,
	color: string
}
