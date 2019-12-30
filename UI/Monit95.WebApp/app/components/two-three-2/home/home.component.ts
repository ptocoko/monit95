import { Component } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { AccountService } from '../../../services/account.service';
import { getFileExtension } from '../../../utils/functions';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	// timeIsCome = false;
	date = new Date();

	constructor(private accountService: AccountService) { }

	ngOnInit() {
		//
		//this.timeIsCome = (date.getDate() === 8 && date.getHours() >= 7 && date.getMinutes() >= 30) || date.getDate() > 8;
	}

	timeIsCome(day: number, hours: number, minutes: number): boolean {
		return (this.date.getDate() === day && (this.date.getHours() === hours && this.date.getMinutes() >= minutes) || this.date.getHours() > hours) || this.date.getDate() > day;
	}
}

