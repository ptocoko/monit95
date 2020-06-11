import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { AccountModel } from '../../../models/account.model';
import { RsurProtocolsService } from '../../../services/rsur-protocols.service';
import { HttpClient } from '@angular/common/http';

@Component({    
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    account = new AccountModel(); 
	isLoading: boolean = true;
	_fillingProgress: string;
	date = new Date();
	filesExist: { [name: string]: boolean } = {};

    constructor(        
		private readonly accountService: AccountService,
		private readonly rsurProtocolService: RsurProtocolsService,
		private readonly http: HttpClient) {        
    }

    ngOnInit() {        
        this.accountService.getAccount().subscribe(data => {            
            this.account = data;            
            this.isLoading = false;
			localStorage.clear();
			this.getStatistics();
        });
	}

	isFileExists(fileName: string) {
		if (this.filesExist[fileName] === undefined) {
			this.filesExist[fileName] = false;
			setTimeout(() => {
				this.http.get(fileName, { observe: 'response' }).subscribe(res => {
					this.filesExist[fileName] = res.status !== 404;
				}, (err) => {
					this.filesExist[fileName] = err.status !== 404;
				});
			});
			return false;
		} else {
			return this.filesExist[fileName];
		}
	}

	getFileLink(examCode: string, subjectStart: string) {
		return `/file/rsur-particip-tests/${this.account.UserName}/${examCode}_${subjectStart}_распределение_${this.account.UserName}.xlsx`;
	}

	getSchoolFileLink(examCode: string, subjectStart: string) {
		return `/file/rsur-particip-tests/schools/${this.account.UserName}/${examCode}_${subjectStart}_распределение_${this.account.UserName}.xlsx`;
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