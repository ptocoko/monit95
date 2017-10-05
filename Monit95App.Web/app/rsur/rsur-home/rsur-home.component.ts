import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { Account } from '../../account/account';

@Component({
    templateUrl: `./app/rsur/rsur-home/rsur-home.component.html?v=${new Date().getTime()}`
})
export class RsurHomeComponent implements  OnInit {
    account = new Account();

    constructor(
        private readonly accountService: AccountService) {
    }

    ngOnInit() {
        this.accountService.getAccount().subscribe(data => {
            console.log(data);
            this.account = data.json() as Account;
            console.log(this.account);
            console.log(this.account.RoleNames.indexOf('school') !== -1);
        });
    }

    isArea() {        
        if (this.account.RoleNames != null)
            return this.account.RoleNames.indexOf('area') > -1;
        return null;
    }
}