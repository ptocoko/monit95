import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-root',
    templateUrl: `./app/components/app/app.component.html?v=${new Date().getTime()}`
})
export class AppComponent implements OnInit {
	isAreaRole = false;
	isCokoRole = false;
	isRsur: boolean = true;

    constructor(private readonly accountService: AccountService) { }

    ngOnInit() {
		
	}

	handler(userRoles: string[]) {
		this.isAreaRole = userRoles.indexOf('area') >= 0;
		this.isCokoRole = userRoles.indexOf('coko') >= 0;
	}
}