import { Component, OnInit, ViewChild } from '@angular/core';
import { ParticipService } from '../../../services/particip.service';
import { ParticipModel } from '../../../models/particip.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { SchoolCollectorService } from '../../../shared/school-collector.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

const PROJECT_ID = 33;
const COLLECTOR_ID = 121;

@Component({
	templateUrl: './particips-list.component.html',
	styleUrls: ['./particips-list.component.css']
})
export class SocietyParticipsListComponent implements OnInit {
	particips: ParticipModel[] = [];
	displayedColumns = ['select', 'num', 'fio', 'status', 'prevYearGrade', 'bookAuthor'];
	dataSource = new MatTableDataSource<ParticipModel>(this.particips);
	selection = new SelectionModel<ParticipModel>(true, []);
	@ViewChild(MatPaginator) paginator: MatPaginator;
	isFinished = false;

	constructor(private readonly participService: ParticipService,
		private dialog: MatDialog,
		private collectorService: SchoolCollectorService) { }

	ngOnInit() {
		this.collectorService.getCollectorState(COLLECTOR_ID).subscribe(collectorState => {
			this.isFinished = collectorState.IsFinished;
		});

		this.dataSource.filterPredicate = (particip, searchText) => {
			return particip.Surname.toLowerCase().includes(searchText) ||
				particip.Name.toLowerCase().includes(searchText);
		};

		this.participService.getByProjectId(PROJECT_ID)
			.subscribe(res => {
				this.dataSource.data = res;
				this.dataSource.paginator = this.paginator;
				this.selection.select(...res.filter(p => p.ActualCode12 === 1));
			});
	}

	applyFilter(filterValue: string) {
		if (filterValue !== null || filterValue !== undefined) {
			// во время поиска сбрасываем paginator на первую страницу
			this.paginator.pageIndex = 0;

			filterValue = filterValue.trim().toLowerCase();
			this.dataSource.filter = filterValue;
		}
	}

	changeSelection(row?: ParticipModel, index?: number) {
		this.selection.toggle(row);

		if (row.ActualCode12 === 1) {
			row.ActualCode12 = null;
		} else {
			row.ActualCode12 = 1;
		}

		this.participService.putParticip(row, row.Id)
			.subscribe(() => { }, error => {
				row.ActualCode12 = null;
				this.selection.toggle(row);
				throw error;
			});
	}

	updateParticip(particip: ParticipModel) {
		this.participService.putParticip(particip, particip.Id).subscribe();
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: ParticipModel, index?: number): string {
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${index + 1}`;
	}


	finish() {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			width: '400px',
			disableClose: true,
			data: { message: `Завершить выборку участников диагностики?` }
		});

		dialogRef.afterClosed().subscribe((result: boolean) => {
			if (result) {
				this.collectorService.isFinished(COLLECTOR_ID, true).subscribe(() => {
					this.isFinished = true;
				});
			}
		});
	}

	notFinished() {
		this.collectorService.isFinished(COLLECTOR_ID, false).subscribe(() => {
			this.isFinished = false;
		});
	}
}