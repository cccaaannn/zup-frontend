import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppTheme } from '../data/enums/app-theme';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class ThemeService {

	private appThemeSubject: BehaviorSubject<any> = new BehaviorSubject(AppTheme.LIGHT);
	private activeTheme: AppTheme = AppTheme.LIGHT;
	private renderer: Renderer2;

	constructor(private rendererFactory: RendererFactory2, private storageService: StorageService) {
		this.renderer = rendererFactory.createRenderer(null, null);

		this.setInitialTheme();
	}

	private setInitialTheme() {
		const storageTheme: string | null = this.storageService.getTheme();
		const initialTheme: AppTheme = storageTheme != null ? storageTheme as AppTheme : AppTheme.LIGHT;
		this.setAppTheme(initialTheme);
	}

	getAppTheme(): Observable<AppTheme> {
		return this.appThemeSubject;
	}

	setAppTheme(theme: AppTheme) {
		if (theme === AppTheme.DARK) {
			this.renderer.addClass(document.body, 'dark');
		}
		if (theme === AppTheme.LIGHT) {
			this.renderer.removeClass(document.body, 'dark');
		}
		this.activeTheme = theme;
		this.storageService.saveTheme(theme);
		this.appThemeSubject.next(theme);
	}

	toggleAppTheme() {
		if (this.activeTheme === AppTheme.LIGHT) {
			this.setAppTheme(AppTheme.DARK);
		}
		else if (this.activeTheme === AppTheme.DARK) {
			this.setAppTheme(AppTheme.LIGHT);
		}
	}

}
