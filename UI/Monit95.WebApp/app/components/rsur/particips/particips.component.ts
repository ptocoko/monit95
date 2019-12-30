import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog, MatSlideToggleChange } from '@angular/material';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

// Models
import { RsurParticipModel } from '../../../models/rsur-particip.model';
import { AccountModel } from '../../../models/account.model';

// Services
import { RsurParticipService } from '../../../services/rsur-particip.service';
import { AccountService } from '../../../services/account.service';
import { SCHOOLNAME_DEFAULT_SELECTION } from '../reports/report-list/report-list.component';

@Component({
    selector: 'rsur/particips',
    templateUrl: './particips.component.html',
    styleUrls: ['./particips.component.css']
})
export class RsurParticipsComponent implements OnInit {
    allParticips: RsurParticipModel[] = [];
    actualParticips: RsurParticipModel[] = [];
    isShowNotActual = true;
    displayedColumns = ['Code', 'Surname', 'Name', 'SecondName', 'RsurSubjectName', 'SchoolIdWithName'];
    dataSource = new MatTableDataSource<RsurParticipModel>();
	isLoading = true;

	selectedSchool = '';
	filterText: string;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	
    constructor(private readonly rsurParticipService: RsurParticipService,
				private readonly accauntService: AccountService,
				private readonly snackBar: MatSnackBar,
				private readonly dialog: MatDialog) {
    }

	ngOnInit() {
		if (this.accauntService.isCoko()) {
			this.displayedColumns.push('FiringBtn');
		}

		this.getParticips();
	}

	getParticips() {
		this.rsurParticipService.getAll()
            .subscribe(response => {
				this.allParticips = response;
				this.actualParticips = this.allParticips.filter(f => f.ActualCode === 1);

				if(this.isShowNotActual){
					this.dataSource = new MatTableDataSource<RsurParticipModel>(this.allParticips);	
				} else {
					this.dataSource = new MatTableDataSource<RsurParticipModel>(this.actualParticips);
				}
                
                this.isLoading = false;
				this.dataSource.sort = this.sort;
				this.dataSource.paginator = this.paginator;
            });
	}

	fireParticip(slideToggle: MatSlideToggleChange, particip: RsurParticipModel) {
		// checked == false означает, что участник исключен из проекта
		if(!slideToggle.checked) {
			// если участник исключается вызываем модальное окно для подтверждения
			const dialogRef = this.dialog.open(ConfirmDialogComponent, {
				width: '400px',
				disableClose: true,
				data: { message: `Вы уверены что хотите исключить участника '${particip.SchoolParticipInfo.Surname} ${particip.SchoolParticipInfo.Name} ${particip.SchoolParticipInfo.SecondName}' из проекта РСУР?` }
			});

			dialogRef.afterClosed().subscribe((result: boolean) =>{
				if(result){
					particip.ActualCode = 0;
					this.rsurParticipService.update(particip.Code, particip)
						.subscribe(() => {
							this.snackBar.open('участник исключен из проекта', 'OK', { duration: 3000 });
						});
				} else {
					// если пользователь не уверен
					slideToggle.source.checked = true;
				}
			});
		} else {
			// если участник возвращается в проект то подтверждение не требуется
			particip.ActualCode = 1;
			this.rsurParticipService.update(particip.Code, particip)
				.subscribe(() => {
					this.snackBar.open('участник добавлен в проект', 'OK', { duration: 3000 });
				});
		}
	}

	applyFilter() {
		this.dataSource.filter = this.filterText.trim().toLowerCase();
	}

	focusFilterInput() {
		this.selectedSchool = '';
		this.applySchoolFilter();

		// на случай если используется кастомный предикат, заменяем его предикатом по умолчанию
		this.dataSource.filterPredicate = defaultFilterPredicate;
	}

	applySchoolFilter() {
		this.filterText = '';
		this.paginator.pageIndex = 0;

		// используем кастомный предикат для поиска только по школам вместо предиката по умолчанию
		this.dataSource.filterPredicate = filterBySchoolPredicate;
		this.dataSource.filter = this.selectedSchool.toLowerCase();
	}
};


function filterBySchoolPredicate(data: RsurParticipModel, filter: string): boolean {
	if (filter === '') return true;
	return data.SchoolParticipInfo.SchoolName.trim().toLowerCase().indexOf(filter) > -1;
}

function defaultFilterPredicate(data: RsurParticipModel, filter: string): boolean {
	if (!filter || filter === '') return true;

	return data.Code.toString().indexOf(filter) > -1
		|| data.SchoolParticipInfo.Surname.toLowerCase().indexOf(filter) > -1
		|| data.SchoolParticipInfo.Name.toLowerCase().indexOf(filter) > -1
		|| data.SchoolParticipInfo.SchoolName.toLowerCase().indexOf(filter) > -1
		|| data.RsurSubjectName.toLowerCase().indexOf(filter) > -1;
}
