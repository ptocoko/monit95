import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
	templateUrl: `./app/one-two-three/home/home.component.html?v=${new Date().getTime()}`
})
export class HomeComponent {
	timeIsCome = false;

	constructor(private accountService: AccountService) { }

	ngOnInit() {
		const date = new Date();
		this.timeIsCome = (date.getDate() === 1 && date.getHours() >= 7 && date.getMonth() === 5) || (date.getDate() > 1 && date.getMonth() === 5);
	}
}