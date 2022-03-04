import { Component } from '@angular/core';

@Component({
	templateUrl: `./app/components/rsur/actualization/hiring/hire-particip.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/actualization/hiring/hire-particip.component.css?v=${new Date().getTime()}`]
})
export class HireComponent {
	isCreatingNew = 0;
	searchText: string;

	conflictHandler(participFio: string) {
		this.isCreatingNew = 0;
		this.searchText = participFio;
	}
}