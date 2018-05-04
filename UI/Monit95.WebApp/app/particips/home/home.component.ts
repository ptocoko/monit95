import { Component } from '@angular/core';

@Component({
	templateUrl: `./app/particips/home/home.component.html?v=${new Date().getTime()}`
})
export class HomeComponent {
	timeIsCome = false;

	constructor() { }

	ngOnInit() {
		const date = new Date();
		//this.timeIsCome = (date.getDate() === 4 && date.getHours() >= 8) || date.getDate() > 4;
	}
}