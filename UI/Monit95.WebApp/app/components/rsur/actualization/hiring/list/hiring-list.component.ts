import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog, MatSlideToggleChange } from '@angular/material';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';

// Models
import { RsurParticipModel } from '../../../../../models/rsur-particip.model';
import { AccountModel } from '../../../../../models/account.model';

// Services
import { RsurParticipService } from '../../../../../services/rsur-particip.service';
import { AccountService } from '../../../../../services/account.service';
import { SCHOOLNAME_DEFAULT_SELECTION } from '../../../reports/report-list/report-list.component';

@Component({
    selector: 'rsur/particips',
	templateUrl: `./app/components/rsur/actualization/hiring/list/hiring-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/actualization/hiring/list/hiring-list.component.css?v=${new Date().getTime()}`]
})
export class HiringListComponent implements OnInit {
    //allParticips: RsurParticipModel[] = [];
    particips: RsurParticipModel[] = [];
    displayedColumns = ['Code', 'Surname', 'Name', 'SecondName', 'RsurSubjectName', 'action'];
    dataSource = new MatTableDataSource<RsurParticipModel>();
	isLoading = true;
	
	filterText: string;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	
    constructor(private readonly rsurParticipService: RsurParticipService,
				private readonly accauntService: AccountService,
				private readonly snackBar: MatSnackBar,
				private readonly dialog: MatDialog) {
    }

	ngOnInit() {
		this.getParticips();
	}

	getParticips() {
		this.rsurParticipService.getAll()
            .subscribe(response => {
				this.particips = response.filter(f => f.ActualCode === 1 || f.ActualCode === 3 || f.ActualCode === 4);
				
				this.dataSource = new MatTableDataSource<RsurParticipModel>(this.particips);
				this.dataSource.filterPredicate = defaultFilterPredicate;

                this.isLoading = false;
				this.dataSource.sort = this.sort;
				this.dataSource.paginator = this.paginator;
            });
	}

	applyFilter() {
		this.dataSource.filter = this.filterText.trim().toLowerCase();
	}

	cancelHiring(particip: RsurParticipModel) {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			width: '400px',
			disableClose: true,
			data: { message: `Вы уверены что хотите отменить добавление участника '${particip.SchoolParticipInfo.Surname} ${particip.SchoolParticipInfo.Name} ${particip.SchoolParticipInfo.SecondName}'? Это действие нельзя отменить` }
		});

		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				if (particip.ActualCode === 3) {
					const part = {
						ActualCode: 2,
						SchoolId: particip.SchoolIdFrom
					} as RsurParticipModel;

					this.rsurParticipService.update(particip.Code, part).subscribe(() => this.deleteItem(particip.Code));
				} else if (particip.ActualCode === 4) {
					this.rsurParticipService.delete(particip.Code).subscribe(() => this.deleteItem(particip.Code));
				}
			}
		});
	}

	private deleteItem(itemCode: number) {
		const partIndex = this.particips.findIndex(p => p.Code === itemCode);

		this.particips.splice(partIndex);
		this.dataSource = new MatTableDataSource<RsurParticipModel>(this.particips);
	}
	//focusFilterInput() {

	//	// на случай если используется кастомный предикат, заменяем его предикатом по умолчанию
	//	this.dataSource.filterPredicate = defaultFilterPredicate;
	//}
};


function defaultFilterPredicate(data: RsurParticipModel, filter: string): boolean {
	if (!filter || filter === '') return true;

	return data.Code.toString().indexOf(filter) > -1
		|| data.SchoolParticipInfo.Surname.toLowerCase().indexOf(filter) > -1
		|| data.SchoolParticipInfo.Name.toLowerCase().indexOf(filter) > -1
		|| data.SchoolParticipInfo.SchoolName.toLowerCase().indexOf(filter) > -1
		|| data.RsurSubjectName.toLowerCase().indexOf(filter) > -1;
}
