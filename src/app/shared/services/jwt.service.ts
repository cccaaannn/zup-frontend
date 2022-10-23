import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import jwtDecode from 'jwt-decode';

@Injectable({
	providedIn: 'root'
})
export class JwtService {

	constructor(private storageService: StorageService) { }

	getDecodedToken(): any {
		const token = this.storageService.getToken();
		if (token && token != null) {
			try {
				return jwtDecode(token);
			}
			catch {
				return null;
			}
		}
		return null;
	}

	/*
	 * Returns true if token is not presets, token is null or token is expired. 
	*/
	isExpired(): boolean {
		const token: any = this.getDecodedToken();
		if(!token || token == null) {
			return true;
		}

		const now: Date = new Date();
		// Jwt token exp date is in seconds, date accepts in milliseconds.
		const tokenExpiration: Date = new Date(parseInt(token.exp) * 1000);

		// If now is larger than expiration, token is expired.
		if(now > tokenExpiration) {
			return true;
		}

		return false;
	}

}
