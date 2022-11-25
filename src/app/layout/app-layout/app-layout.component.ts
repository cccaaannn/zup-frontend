import { Component, OnInit } from '@angular/core';
import { AppTheme } from 'src/app/shared/data/enums/app-theme';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
	selector: 'zup-layout',
	templateUrl: './app-layout.component.html',
	styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

	constructor(private themeService: ThemeService) { }

	isDark: boolean = false;

	ngOnInit(): void {
		this.themeService.getAppTheme().subscribe({
			next: (theme: AppTheme) => {
				if(theme === AppTheme.DARK) {
					this.isDark = true;
				}
				else {
					this.isDark = false;
				}
			}
		})
	}

	onThemeChange() {
		this.themeService.toggleAppTheme();
	}

}
