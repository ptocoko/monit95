import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
    selector: 'result',
    templateUrl: './app/result/result.html',
    providers: [AccountService]
})
export class ResultComponent implements OnInit
{
    areaCode: number;

    constructor(private accountService: AccountService) { }

    ngOnInit() {
		//this.userService.getName().subscribe(user => {
		//	if (user.userRoles.indexOf('area') >= 0)
		//		this.areaCode = Number.parseInt(user.userName);
		}
    
}