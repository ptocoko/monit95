import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

// Models
import { RsurParticip } from '../rsurparticip';
import { Account } from '../../shared/account';

// Services
import { RsurParticipService } from '../rsurparticip.service';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'rsur/particips',
    templateUrl: `./app/rsur/rsur-particips/rsur-particips.component.html?v=${new Date().getTime()}`,
    styleUrls: ['./app/rsur/rsur-particips/rsur-particips.component.css']
})
export class RsurParticipsComponent implements OnInit {
    particips: RsurParticip[] = [];	
    account = new Account();

    constructor(private readonly rsurParticipService: RsurParticipService,
                private readonly accountService: AccountService) {        
    }

    ngOnInit() {
        this.getAllParticips(); 
        this.accountService.getAccount().subscribe(data => {            
            this.account = data.json() as Account;           
        });
    }

    getAllParticips() {
        this.rsurParticipService.getAll()
            .subscribe((response: Response) => {
                this.particips = response.json() as RsurParticip[];
            });
    }

    isArea() {        
        if (this.account.RoleNames != null)
            return this.account.RoleNames.indexOf('area') > -1;
        return null;
    }
};

