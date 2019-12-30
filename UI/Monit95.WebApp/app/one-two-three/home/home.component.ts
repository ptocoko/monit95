import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
	templateUrl: './home.component.html',
})
export class HomeComponent {
	timeIsCome = false;

	constructor(public accountService: AccountService) { }

	ngOnInit() {
		const date = new Date();
		this.timeIsCome = (date.getDate() === 21 && date.getHours() >= 7 && date.getMinutes() >= 30) || date.getDate() > 21;
	}
}