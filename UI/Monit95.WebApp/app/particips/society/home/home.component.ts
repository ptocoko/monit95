import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { CardsService } from '../../../services/cards.service';
import { downloadFile } from '../../../utils/functions';

@Component({
	templateUrl: './home.component.html',
})
export class SocietyHomeComponent {
	timeIsCome = false;

	constructor(public account: AccountService, private cards: CardsService) { }

	ngOnInit() {
		const date = new Date();
		this.timeIsCome = this.account.account.UserName === '0000' ? true : (date.getDate() === 22 && date.getHours() >= 8) || date.getDate() > 22;
	}

	downloadProtocol() {
		this.cards.getForSchool(20).subscribe(cards => {
			const url = window.URL.createObjectURL(cards);
			downloadFile(url, 'протокол «Я сдам Обществознание!».zip');
		});
	}
}