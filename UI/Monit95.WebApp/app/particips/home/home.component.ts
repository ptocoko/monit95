import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CardsService } from '../../services/cards.service';
import { downloadFile } from '../../utils/functions';

@Component({
	templateUrl: `./app/particips/home/home.component.html?v=${new Date().getTime()}`
})
export class HomeComponent {
	date = new Date();

	constructor(private account: AccountService, private cards: CardsService) { }

	ngOnInit() {}

	downloadCards(projectId: number) {
		this.cards.getForSchool(projectId).subscribe(cards => {
			const url = window.URL.createObjectURL(cards);
			downloadFile(url, 'результаты.zip');
		});
	}

	setTimer(day: number, hours: number = 12): boolean {
		return (this.date.getDate() === day && this.date.getHours() >= hours) || this.date.getDate() > day;
	}
}