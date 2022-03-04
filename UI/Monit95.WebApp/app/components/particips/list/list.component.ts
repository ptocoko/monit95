import { Component, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ParticipModel } from '../../../models/particip.model';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ParticipsService } from '../../../services/refactored/particips.service';
import { ClassModel } from '../../../models/class.model';
import { SchoolCollectorService } from '../../../shared/school-collector.service';

@Component({
	templateUrl: `./app/components/particips/list/list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/particips/list/list.component.css?v=${new Date().getTime()}`]
})
export class ListComponent {
	particips: ParticipModel[] = [];
	filteredParticips: ParticipModel[] = [];
	isLoading = true;
	classes: string[] = [];
	selectedClass = '';

	projectId: number;
	projectName: string;
	classNumber: number;

	displayedColumns = ['$id', 'Surname', 'Name', 'SecondName', 'ClassName', 'del-action']
	dataSource = new MatTableDataSource<ParticipModel>();

	collectorByPojectId: any = {
		'39': {
			'8': 125,
			'9': 126
		},
		'41': {
			'6': 130,
			'10': 131
		},
	};
	collectorId: number;
	isFinished: boolean;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private readonly router: Router,
		private route: ActivatedRoute,
		private readonly modal: MatDialog,
		private readonly snackBar: MatSnackBar,
		private readonly participsService: ParticipsService,
		private collectorService: SchoolCollectorService) { }

	ngOnInit() {
		this.route.queryParamMap.subscribe(queryParams => {
			this.isLoading = true;
			this.projectName = queryParams.get('projectName');
			this.projectId = +queryParams.get('projectId');

			if (queryParams.has('classNumber')) {
				this.classNumber = +queryParams.get('classNumber');
			}

			this.participsService.getAll(this.projectId).subscribe(particips => {
				particips = particips.map(p => {
					p.ClassName = p.ClassName.trim();
					return p;
				});
				if (this.classNumber) {
					particips = particips.filter(p => p.ClassName.startsWith(this.classNumber.toString()));
				}
                this.dataSource = new MatTableDataSource<ParticipModel>(particips);
				this.particips = particips;
				this.filteredParticips = [].concat(this.particips);
				this.classes = Array.from(new Set(this.particips.map(p => p.ClassName)));
				this.classes.sort((a, b) => a.localeCompare(b));

				if (this.projectId === 39 || this.projectId === 41) {
					this.collectorId = this.collectorByPojectId[this.projectId][this.classNumber];
				} else {
					this.collectorId = this.collectorByPojectId[this.projectId];
				}
				if (this.collectorId) {
					this.collectorService.getCollectorState(this.collectorId).subscribe(state => {
						this.isFinished = state.IsFinished;
						if (state.IsFinished) {
							this.displayedColumns = this.displayedColumns.filter(dc => dc !== 'del-action');
						}
						this.isLoading = false;
					});
				} else {
					this.isLoading = false;
				}
            });
		});

		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	addClassParticip() {
		this.router.navigate(['/particips2/new'], { queryParams: { 'projectId': this.projectId, 'projectName': this.projectName, classNumber: this.classNumber } });
	}

	applyFilter(filterValue: string) {
		// во время поиска сбрасываем paginator на первую страницу
		this.paginator.pageIndex = 0;

		filterValue = filterValue.trim().toLowerCase();
		this.dataSource.filter = filterValue;
	}

	applyClassFilter() {
		if (this.selectedClass) {
			this.filteredParticips = this.particips.filter(p => p.ClassName === this.selectedClass);
		} else {
			this.filteredParticips = [].concat(this.particips);
        }
        this.dataSource = new MatTableDataSource(this.filteredParticips);
    }
	
	deleteClassParticip(particip: ParticipModel) {
		let participIndex = this.particips.indexOf(particip);

		const modalRef = this.modal.open(ConfirmDialogComponent, {
			width: '400px',
			disableClose: true,
			data: { message: `Вы уверены что хотите удалить данного участника?` }
		});

		modalRef.afterClosed().subscribe((isDelete: boolean) => {
			if (isDelete) {
				this.participsService.delete(particip.Id)
					.subscribe(() => {
						//this.getParticips();
						this.particips.splice(participIndex, 1);
						this.dataSource.data = this.particips;
						this.snackBar.open('участник удален!', 'OK', { duration: 3000 });
					});
			}
		});
	}

	finish() {
		this.collectorService.isFinished(this.collectorId, true).subscribe(() => {
			this.isFinished = true;
			this.displayedColumns = this.displayedColumns.filter(dc => dc !== 'del-action');
		});
	}

	undoFinish() {
		this.collectorService.isFinished(this.collectorId, false).subscribe(() => {
			this.isFinished = false;
			this.displayedColumns.push('del-action');
		});
	}
}