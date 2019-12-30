import { Component } from '@angular/core';

@Component({
	templateUrl: './hire-particip.component.html',
	styleUrls: ['./hire-particip.component.css']
})
export class HireComponent {
	isCreatingNew = 0;
	searchText: string;

	conflictHandler(participFio: string) {
		this.isCreatingNew = 0;
		this.searchText = participFio;
	}
}