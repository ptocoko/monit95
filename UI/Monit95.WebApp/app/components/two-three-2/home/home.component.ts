import { Component } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { AccountService } from '../../../services/account.service';
import { getFileExtension } from '../../../utils/functions';

@Component({
	templateUrl: `./app/components/two-three-2/home/home.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/two-three-2/home/home.component.css?v=${new Date().getTime()}`]
})
export class HomeComponent {
	timeIsCome = false;

	constructor(private accountService: AccountService) { }

	ngOnInit() {
		const date = new Date();
		this.timeIsCome = (date.getDate() === 3 && date.getHours() >= 8) || date.getDate() > 3;
	}
}

