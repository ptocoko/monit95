import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../account/account.service';
import { Account } from '../../account/account';

@Component({
    templateUrl: `./app/rsur/rsur-exams/rsur-exams.component.html?v=${new Date().getTime()}`
})
export class RsurExamsComponent implements OnInit {
    account = new Account();

    constructor(
        private readonly accountService: AccountService) {
    }

    ngOnInit() {
        this.accountService.getAccount().subscribe(data => {
            this.account = data.json() as Account;
        });
    }

    isArea206() {
        if (this.account.RoleNames != null)
            return this.account.UserName === '206';
        return null;
    }
}