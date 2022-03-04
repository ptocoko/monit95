import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ParticipProtocolsService } from '../../services/particip-protocols.service';
import { Observable } from 'rxjs/Observable';
import { QuestionProtocolRead } from '../../models/question-protocol-read.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';

//const PROJECT_TEST_ID: number = 1;

@Component({
	templateUrl: `./app/particips/protocols/protocols.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/particips/protocols/protocols.component.css?v=${new Date().getTime()}`]
})
export class ProtocolsComponent {
	displayedColumns = ['index', 'FIO', 'DocumNumber', 'Marks', 'actions'];
	protocolsCount = 0;
	AbsentText = 'отсутствовал';
	dataSource = new MatTableDataSource<QuestionProtocolRead>();
	protocols: QuestionProtocolRead[] = [];
	isLoading = true;
	hasOptionNumber: boolean;

	@ViewChild('paginator') paginator: MatPaginator;

	// вычисление статистики
	processedProtocols = () => this.protocols.filter(f => f.QuestionMarks).length;
	notProcessedProtocols = () => this.protocols.filter(f => !f.QuestionMarks).length;

	constructor(private participProtocolsService: ParticipProtocolsService,
		private router: Router,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.queryParamMap.subscribe(queryParams => {
			this.hasOptionNumber = queryParams.has('hasOptionNumber');
		});
		this.getProtocols();
	}
	
	getProtocols() {
		this.isLoading = true;
		this.route.params.subscribe(params => {
			const projectTestId = Number.parseInt(params['id']);

			this.participProtocolsService.getProtocolsList(projectTestId).subscribe(res => {
				this.protocolsCount = res.length;
				this.protocols = res;
				if (res.every(r => !r.DocumNumber)) {
					this.displayedColumns = this.displayedColumns.filter(dc => dc !== 'DocumNumber');
                }
				this.dataSource = new MatTableDataSource<QuestionProtocolRead>(res);
				this.isLoading = false;
				this.dataSource.paginator = this.paginator;
			});

		})

	}

	changeMarks(participTestId: number) {
		let opt: any = {};
		if (this.hasOptionNumber) {
			opt.queryParams = {
				'hasOptionNumber': 'true'
            }
        }
		this.router.navigate(['/particips/protocol', participTestId], opt);
	}

	applyFilter(searchText: string) {
		// во время поиска сбрасываем paginator на первую страницу
		this.paginator.pageIndex = 0;

		searchText = searchText.trim().toLowerCase();
		this.dataSource.filter = searchText;
	}

	markAsAbsent(protocol: QuestionProtocolRead) {
		const index = this.dataSource.data.indexOf(protocol);
		this.participProtocolsService.markAsAbsent(protocol.ParticipTestId).subscribe(_ => {
			this.dataSource.data[index].QuestionMarks = this.AbsentText;
		});
	}
}