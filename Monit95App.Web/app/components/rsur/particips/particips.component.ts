import { Component, OnInit, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { MatTableDataSource, MatSort } from '@angular/material';

// Models
import { RsurParticipModel } from '../../../models/rsur-particip.model';
import { AccountModel } from '../../../models/account.model';

// Services
import { RsurParticipService } from '../../../services/rsur-particip.service';
import { AccountService } from '../../../services/account.service';

@Component({
    selector: 'rsur/particips',
    templateUrl: `./app/components/rsur/particips/particips.component.html?v=${new Date().getTime()}`,
    styleUrls: [`./app/components/rsur/particips/particips.component.css`]
})
export class RsurParticipsComponent implements OnInit {
    particips: RsurParticipModel[] = [];
    //account = new AccountModel();
    isShowNotActual: boolean = false;
    displayedColumns = ['Code', 'Surname'];
    dataSource = new MatTableDataSource<RsurParticipModel>();
    isLoading: boolean = true;

    @ViewChild(MatSort) sort: MatSort;
 
    constructor(private readonly rsurParticipService: RsurParticipService,
        private readonly accountService: AccountService) {
    }

    ngOnInit() {
        
        this.rsurParticipService.getAll()
            .subscribe((response: Response) => {
                this.particips = response.json() as RsurParticipModel[];
                this.dataSource = new MatTableDataSource<RsurParticipModel>(this.particips);
                this.isLoading = false;
                this.dataSource.sort = this.sort;
            });
        //this.accountService.getAccount().subscribe(data => {            
        //    this.account = data.json() as AccountModel;           
        //});
    }

  

    

    //isArea() {        
    //    if (this.account.RoleNames != null)
    //        return this.account.RoleNames.indexOf('area') > -1;
    //    return null;
    //}
};

