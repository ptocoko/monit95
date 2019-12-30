import { Component } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { AccountService } from '../../../services/account.service';
import { getFileExtension } from '../../../utils/functions';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	timeIsCome = false;

	constructor(public accountService: AccountService) { }

	ngOnInit() {
		const date = new Date();
		this.timeIsCome = (date.getDate() === 28 && date.getHours() >= 8) || date.getDate() > 28;
	}
}

