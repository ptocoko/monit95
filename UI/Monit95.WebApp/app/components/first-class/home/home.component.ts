import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { removeFromLocalStorage } from '../../../utils/local-storage';
import { CardsService } from '../../../services/cards.service';

const PROJECT_TEST_ID = 2043;

@Component({
	templateUrl: `./app/components/first-class/home/home.component.html?v=${new Date().getTime()}`
})
export class HomeComponent {
	timeIsCome = false;
	cardsIdGenerating = false;

	constructor(private accountService: AccountService,
		private cardsService: CardsService) { }

	ngOnInit() {
		//const date = new Date();
		//this.timeIsCome = (date.getDate() === 17 && date.getHours() >= 8) || date.getDate() > 17;
		removeFromLocalStorage('FIRST_CLASS_ID');
	}

	downloadCards() {
		this.cardsIdGenerating = true;
		this.cardsService.getForSchool(PROJECT_TEST_ID).subscribe(cards => {
			var url = window.URL.createObjectURL(cards);
			var a = document.createElement('a');
			document.body.appendChild(a);
			a.setAttribute('style', 'display: none');
			a.href = url;
			a.download = 'карты.zip';
			a.click();
			window.URL.revokeObjectURL(url);
			a.remove();
			this.cardsIdGenerating = false;
		});
	}
}