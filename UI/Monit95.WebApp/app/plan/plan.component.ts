import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

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

    }
};