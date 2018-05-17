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
		this.timeIsCome = (date.getDate() === 17 && date.getHours() >= 8) || date.getDate() > 17;
	}
}