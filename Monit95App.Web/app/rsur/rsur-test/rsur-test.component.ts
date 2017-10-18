import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../account/account.service';
import { RsurTestService } from './rsur-test.service';

import { Account } from '../../account/account';

class RsurTestStatistics {
	HasAnyParticip: string;
	ProtocolStatus: number;
}

@Component({
    selector:'test',
    templateUrl: `./app/rsur/rsur-test/rsur-test.component.html?v=${new Date().getTime()}`,
    styleUrls: [`./app/rsur/rsur-test/rsur-test.component.css?v=${new Date().getTime()}`]
})
export class RsurTestComponent implements OnInit {
    account = new Account();  
	percent: number;
	componentIsShowing: boolean = false;
	protocolValues: any;

    constructor(
        private readonly accountService: AccountService,
        private readonly rsurTestService: RsurTestService) {
    }

    ngOnInit() {
        this.accountService.getAccount().subscribe(data => {
			this.account = data.json() as Account;
			this.rsurTestService.getProtocolStatus2().subscribe(res => {
				this.protocolValues = res.json();
				this.componentIsShowing = true;
			})
        });
        //this.getProtocolStatus(1082);
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

	getProgressValue(rsurTestId: number) {
		if (this.componentIsShowing) {
			if (this.protocolValues[rsurTestId]) {
				return this.protocolValues[rsurTestId].ProtocolStatus;
			}
			else {
				return 0;
			}
		}
		else {
			return 0;
		}
	}

	hasValues(rsurTestId: number) {
		if (this.componentIsShowing) {
			return this.protocolValues[rsurTestId]
		}
		else {
			return true;
		}
	}
}