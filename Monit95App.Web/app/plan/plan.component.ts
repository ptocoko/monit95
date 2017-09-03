import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';

@Component({
    selector: 'plan',
    templateUrl: './app/plan/plan.html',
    providers: [AccountService]
})
export class PlanComponent implements OnInit
{
    areaCode: number;

    constructor(private readonly  accountService: AccountService) { }

    ngOnInit() {
		//this.userService.getName().subscribe(user => {
		//	if (user.userRoles.indexOf('area') >= 0)
		//		this.areaCode = Number.parseInt(user.userName);
		//});
    }
};