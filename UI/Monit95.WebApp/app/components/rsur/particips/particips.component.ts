import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Response } from '@angular/http';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog, MatSlideToggleChange } from '@angular/material';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

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
    allParticips: RsurParticipModel[] = [];
	actualParticips: RsurParticipModel[] = [];
	isShowNotActual = false;
    displayedColumns = ['Code', 'Surname', 'Name', 'SecondName', 'RsurSubjectName', 'SchoolIdWithName'];
    dataSource = new MatTableDataSource<RsurParticipModel>();
    isLoading = true;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	// for paginator
	getParticipsCount = () => this.isShowNotActual ? this.allParticips.length : this.actualParticips.length;

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
            .subscribe((response: Response) => {
				this.allParticips = response.json() as RsurParticipModel[];
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

	showFired(isChecked: boolean) {
		this.isShowNotActual = isChecked;
		if(isChecked) {
			this.dataSource = new MatTableDataSource<RsurParticipModel>(this.allParticips);
		} else {
			this.dataSource = new MatTableDataSource<RsurParticipModel>(this.actualParticips);
		}
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	fireParticip(slideToggle: MatSlideToggleChange, particip: RsurParticipModel) {
		// checked == false означает, что участник исключен из проекта
		if(!slideToggle.checked) {
			// если участник исключается вызываем модальное окно для подтверждения
			const dialogRef = this.dialog.open(ConfirmDialogComponent, {
				width: '400px',
				disableClose: true,
				data: { message: `Вы уверены что хотите исключить участника '${particip.Surname} ${particip.Name} ${particip.SecondName}' из проекта РСУР?` }
			});

			dialogRef.afterClosed().subscribe((result: boolean) =>{
				if(result){
					particip.ActualCode = 0;
					this.rsurParticipService.update(particip.Code, particip)
						.subscribe(res => {
							this.snackBar.open('участник исключен из проекта', 'OK', { duration: 3000 });
							this.getParticips();
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
				.subscribe(res => {
					this.snackBar.open('участник добавлен в проект', 'OK', { duration: 3000 });
					this.getParticips();
				});
		}
	}

	applyFilter(searchText: string) {
		searchText = searchText.trim().toLowerCase();
		this.dataSource.filter = searchText;
	}
};

