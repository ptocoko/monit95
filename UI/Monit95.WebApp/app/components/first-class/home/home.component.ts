import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { removeFromLocalStorage } from '../../../utils/local-storage';
import { CardsService } from '../../../services/cards.service';
import { SchoolService } from '../../../school.service';

const PROJECT_TEST_ID = 3078;

@Component({
	templateUrl: `./app/components/first-class/home/home.component.html?v=${new Date().getTime()}`
})
export class HomeComponent {
	timeIsCome = false;
	cardsIdGenerating = false;
	loading = true;
	currentAreaCode: number;

	constructor(public accountService: AccountService,
		private cardsService: CardsService,
		private schoolsService: SchoolService) { }

	ngOnInit() {
		//const date = new Date();
		//this.timeIsCome = (date.getDate() === 17 && date.getHours() >= 8) || date.getDate() > 17;
		removeFromLocalStorage('FIRST_CLASS_ID');

		const authSub = this.accountService.auth.subscribe(auth => {
			if (auth) {
				this.schoolsService.getInfo(auth.UserName).subscribe(info => {
					this.currentAreaCode = info.AreaCode;
					this.loading = false;
					authSub.unsubscribe();
				});
			}
		});
	}

	downloadCards() {
		this.cardsIdGenerating = true;
		this.cardsService.getForSchool(PROJECT_TEST_ID).subscribe(cards => {
			var url = window.URL.createObjectURL(cards);
			var a = document.createElement('a');
			document.body.appendChild(a);
			a.setAttribute('style', 'display: none');
			a.href = url;
			a.download = '1-е классы карты.zip';
			a.click();
			window.URL.revokeObjectURL(url);
			a.remove();
			this.cardsIdGenerating = false;
		}, error => {
			this.cardsIdGenerating = false;
			if (error.status === 404) {
				alert('Карты не найдены. Если Вы уверены что загружали результаты участников, пожалуйста, обратитесть к администратору');
			} else {
				throw error;
			}
		});
	}
}