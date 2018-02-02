import { Component, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ParticipProtocolsService } from '../../services/particip-protocols.service';
import { Observable } from 'rxjs/Observable';
import { QuestionProtocolRead } from '../../models/question-protocol-read.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';

const PROJECT_TEST_ID: number = 1;

@Component({
	templateUrl: `./app/particips/protocols/protocols.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/particips/protocols/protocols.component.css?v=${new Date().getTime()}`]
})
export class ProtocolsComponent {
	displayedColumns = ['index', 'FIO', 'Marks', 'actions'];
	protocolsCount: number;
	AbsentText = 'отсутствовал';
	dataSource = new MatTableDataSource<QuestionProtocolRead>();
	protocols: QuestionProtocolRead[];
	isLoading = true;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	// вычисление статистики
	processedProtocols = () => this.protocols.filter(f => f.QuestionMarks).length;
	notProcessedProtocols = () => this.protocols.filter(f => !f.QuestionMarks).length;

	constructor(private participProtocolsService: ParticipProtocolsService,
				private router: Router) { }

	ngOnInit() {
		this.getProtocols();
	}
	
	getProtocols() {
		this.isLoading = true;
	    this.participProtocolsService.getProtocolsList().subscribe(res => {
			this.protocols = res;
			this.protocolsCount = res.length;
			this.dataSource = new MatTableDataSource<QuestionProtocolRead>(res);
			this.isLoading = false;
			this.dataSource.paginator = this.paginator;
	    });

	}

	changeMarks(participTestId: number) {
		this.router.navigate(['/particips/protocol', participTestId]);
	}

	applyFilter(searchText: string) {
		// во время поиска сбрасываем paginator на первую страницу
		this.paginator.pageIndex = 0;

		searchText = searchText.trim().toLowerCase();
		this.dataSource.filter = searchText;
	}

	markAsAbsent(protocol: QuestionProtocolRead) {
		this.participProtocolsService.markAsAbsent(protocol.ParticipTestId).subscribe(_ => {
			//protocol.QuestionMarks = this.AbsentText;
			this.getProtocols();
		});
	}
}