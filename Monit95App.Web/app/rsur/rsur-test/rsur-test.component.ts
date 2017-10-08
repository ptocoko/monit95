﻿import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../account/account.service';
import { RsurTestService } from './rsur-test.service';

import { Account } from '../../account/account';

@Component({
    selector:'test',
    templateUrl: `./app/rsur/rsur-test/rsur-test.component.html?v=${new Date().getTime()}`,
    styleUrls: [`./app/rsur/rsur-test/rsur-test.component.css?v=${new Date().getTime()}`]
})
export class RsurTestComponent implements OnInit {
    account = new Account();  
    percent: number;

    constructor(
        private readonly accountService: AccountService,
        private readonly rsurTestService: RsurTestService) {
    }

    ngOnInit() {
        this.accountService.getAccount().subscribe(data => {
            this.account = data.json() as Account;
        });
        this.getProtocolStatus(1082);
    }

    isArea206() {
        if (this.account.RoleNames != null)
            return this.account.UserName === '206';
        return null;
    }

    getProtocolStatus(rsurTestId: number) {   
        this.rsurTestService.getProtocolStatus(rsurTestId).subscribe(response => {
            console.log(response.json());
            this.percent = response.json().ProtocolStatus;
        });        
    }
}