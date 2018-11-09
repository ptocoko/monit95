import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';

@Component({
	templateUrl: `./app/particips/oge/home/home.component.html?v=${new Date().getTime()}`
})
export class OgeHomeComponent {
	timeIsCome = false;

	constructor(public account: AccountService) { }

	ngOnInit() {
		const date = new Date();
		this.timeIsCome = this.account.account.UserName === '0000' ? true : (date.getDate() === 12 && date.getHours() >= 8) || date.getDate() > 12;
	}
}