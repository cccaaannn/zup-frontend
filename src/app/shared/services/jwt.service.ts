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
			return jwtDecode(token);
		}
		return null;
	}

}
