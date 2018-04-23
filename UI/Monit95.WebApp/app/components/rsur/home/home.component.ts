import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { AccountModel } from '../../../models/account.model';
import { RsurProtocolsService } from '../../../services/rsur-protocols.service';

@Component({    
    templateUrl: `./app/components/rsur/home/home.component.html?v=${new Date().getTime()}`
})
export class HomeComponent implements OnInit {
    account = new AccountModel(); 
	isLoading: boolean = true;
	_fillingProgress: string;

    constructor(        
		private readonly accountService: AccountService,
		private readonly rsurProtocolService: RsurProtocolsService) {        
    }

    ngOnInit() {        
        this.accountService.getAccount().subscribe(data => {            
            this.account = data;            
            this.isLoading = false;
			localStorage.clear();
			//this.rsurProtocolService.getStatistics().subscribe(progress => this._fillingProgress = progress);
        });
    }

    isArea() {                
        if (this.account.RoleNames != null)
            return this.account.RoleNames.indexOf('area') > -1;
        return null;
	}

	isSchool() {
		if (this.account.RoleNames != null)
			return this.account.RoleNames.indexOf('school') > -1;
		return null;
	}

	isRsurParticip() {
        if (this.account.RoleNames != null) {            
            return this.account.RoleNames.indexOf('rsur-particip') > -1;
        }
			
		return null;
	}

	isArgun(): boolean {
		return this.account.UserName && this.account.UserName === '202';
	}

	isAdmin(): boolean {
		return this.account.UserName && this.account.UserName === '200';
	}

	//fillingProgress() {
	//	if (!this._fillingProgress) {
	//		return 0;
	//	}

	//	return Number.parseInt(this._fillingProgress);
	//}
}