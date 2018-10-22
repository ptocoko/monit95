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
		//const date = new Date();
		//this.timeIsCome = (date.getDate() === 8 && date.getHours() >= 14) || date.getDate() > 8;
	}
}