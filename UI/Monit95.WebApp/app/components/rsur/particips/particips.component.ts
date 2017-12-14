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
    styleUrls: [`./app/components/rsur/particips/particips.component.css?v=${new Date().getTime()}`]
})
export class RsurParticipsComponent implements OnInit {
    particips: RsurParticipModel[] = [];    
    isShowNotActual: boolean = false;
    displayedColumns = ['Code', 'Surname', 'Name', 'SecondName', 'RsurSubjectName', 'SchoolIdWithName'];
    dataSource = new MatTableDataSource<RsurParticipModel>();
    isLoading: boolean = true;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private readonly rsurParticipService: RsurParticipService,
        private readonly accountService: AccountService) {
    }

    ngOnInit() {
        console.log('start...');
        this.rsurParticipService.getAll()
            .subscribe((response: Response) => {
				this.particips = response.json() as RsurParticipModel[];
				this.particips = this.particips.filter(f => f.ActualCode === 1); //TODO: set ActualCode here
                this.dataSource = new MatTableDataSource<RsurParticipModel>(this.particips);
                this.isLoading = false;
                this.dataSource.sort = this.sort;
            });
    }
};

