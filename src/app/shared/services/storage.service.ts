import { Injectable } from '@angular/core';
import { StorageNames } from '../data/enums/storage-names';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	constructor() { }

	save(name: string, item: string) {
		localStorage.removeItem(name);
		localStorage.setItem(name, item);
	}

	get(name: string): string | null {
		return localStorage.getItem(name);
	}

	remove(name: string) {
		localStorage.removeItem(name);
	}


	saveToken(token: string): void {
		this.save(StorageNames.TOKEN, token);
	}

	getToken(): string | null {
		return this.get(StorageNames.TOKEN);
	}

	removeToken(): void {
		this.remove(StorageNames.TOKEN);
	}

	saveRememberMe(userName: string): void {
		this.save(StorageNames.REMEMBER_ME, userName);
	}

	getRememberMe(): string | null {
		return this.get(StorageNames.REMEMBER_ME);
	}

	removeRememberMe(): void {
		this.remove(StorageNames.REMEMBER_ME);
	}

	saveTheme(userName: string): void {
		this.save(StorageNames.THEME, userName);
	}

	getTheme(): string | null {
		return this.get(StorageNames.THEME);
	}

	removeTheme(): void {
		this.remove(StorageNames.THEME);
	}

}
