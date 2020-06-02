import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { AccountModel } from '../../../models/account.model';
import { RsurProtocolsService } from '../../../services/rsur-protocols.service';

@Component({    
	templateUrl: `./app/components/rsur/home/home.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/home/home.component.css?v=${new Date().getTime()}`]
})
export class HomeComponent implements OnInit {
    account = new AccountModel(); 
	isLoading: boolean = true;
	_fillingProgress: string;
	date = new Date();

    constructor(        
		private readonly accountService: AccountService,
		private readonly rsurProtocolService: RsurProtocolsService) {        
    }

    ngOnInit() {        
        this.accountService.getAccount().subscribe(data => {            
            this.account = data;            
            this.isLoading = false;
			localStorage.clear();
			this.getStatistics();
        });
	}

	setTimer(day: number, hours: number = 12): boolean {
		return (this.date.getDate() === day && this.date.getHours() >= hours) || this.date.getDate() > day;
	}

	private getStatistics() {
        this.rsurProtocolService.getStatistics().subscribe(progress => this._fillingProgress = progress, error => {
            const modelState = JSON.parse(error.error).ModelState;
            if (!modelState['404']) {
                throw error;
            }
        });
    }

    isArea() {                
        if (this.account.RoleNames != null)
            return this.account.RoleNames.indexOf('area') > -1 && this.account.UserName !== '200';
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

	fillingProgress() {
		if (!this._fillingProgress) {
			return 0;
		}

		return Number.parseInt(this._fillingProgress);
	}
}