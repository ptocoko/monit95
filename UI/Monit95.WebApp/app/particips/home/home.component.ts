import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CardsService } from '../../services/cards.service';
import { downloadFile } from '../../utils/functions';

@Component({
	templateUrl: `./app/particips/home/home.component.html?v=${new Date().getTime()}`
})
export class HomeComponent {
	timeIsCome = false;

	constructor(private account: AccountService, private cards: CardsService) { }

	ngOnInit() {
		const date = new Date();
		this.timeIsCome = (date.getDate() === 1 && date.getHours() >= 8) || date.getDate() === 2;
	}

	downloadCards() {
		this.cards.getForSchool(18).subscribe(cards => {
			const url = window.URL.createObjectURL(cards);
			downloadFile(url, 'результаты.zip');
		});
	}
}