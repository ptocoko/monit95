import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
    selector: 'plan',
    templateUrl: './app/plan/plan.html',
    providers: [UserService]
})
export class PlanComponent implements OnInit
{
    areaCode: number;

    constructor(private userService: UserService) { }

    ngOnInit() {
		//this.userService.getName().subscribe(user => {
		//	if (user.userRoles.indexOf('area') >= 0)
		//		this.areaCode = Number.parseInt(user.userName);
		//});
    }
};