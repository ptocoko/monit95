import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FileService } from '../../services/file.service';

@Component({
	templateUrl: `./app/particips/home/home.component.html?v=${new Date().getTime()}`
})
export class HomeComponent {
	timeIsCome = false;

	constructor(private account: AccountService, private file: FileService) { }

	ngOnInit() {
		const date = new Date();
		this.timeIsCome = (date.getDate() === 1 && date.getHours() >= 8) || date.getDate() === 2;
	}
}