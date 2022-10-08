import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	constructor() { }

	saveToken(token: string): void {
		localStorage.removeItem("TOKEN");
		localStorage.setItem("TOKEN", token);
	}

	getToken(): string | null {
		return localStorage.getItem("TOKEN");
	}

	removeToken(): void {
		localStorage.removeItem("TOKEN");
	}

}
