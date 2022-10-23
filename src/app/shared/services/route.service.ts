import { Injectable } from '@angular/core';
import { AppRoutes } from '../data/enums/routes';

@Injectable({
	providedIn: 'root'
})
export class RouteService {
	AppRoutes: typeof AppRoutes;
	
	constructor() {
		this.AppRoutes = AppRoutes;
	}
}
