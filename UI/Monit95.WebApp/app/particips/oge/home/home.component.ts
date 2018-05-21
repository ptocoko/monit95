import { Component } from '@angular/core';

@Component({
	templateUrl: `./app/particips/oge/home/home.component.html?v=${new Date().getTime()}`
})
export class OgeHomeComponent {
	timeIsCome = false;

	constructor() { }

	ngOnInit() {
		const date = new Date();
		this.timeIsCome = (date.getDate() === 18 && date.getHours() >= 14) || date.getDate() > 18;
	}
}