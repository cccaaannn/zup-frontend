import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../data/enums/routes';
import { WebsocketService } from './api/websocket.service';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class SessionService {
	
	constructor(
		private router: Router,
		private storageService: StorageService,
		private websocketService: WebsocketService
	) { }

	logout() {
		this.storageService.removeToken();
		this.websocketService.closeWebsocket();
		this.router.navigate([AppRoutes.LOGIN]);
	}

}
