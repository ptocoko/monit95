import { Component } from '@angular/core';
import { ProtocolList } from '../../../models/one-two-three/protocol-list.model';
import { QuestionProtocolService } from '../../../services/one-two-three/question-protocols.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NumberCodes } from '../../NumberCodes';

@Component({
	templateUrl: `./app/one-two-three/question-protocols/list/protocols-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/one-two-three/question-protocols/list/protocols-list.component.css?v=${new Date().getTime()}`]
})
export class ProtocolsListComponent {
	projectTestId: number;
	protocols: ProtocolList[] = [];
	processedProtocols = () => this.protocols.filter(f => f.Marks).length;
	notProcessedProtocols = () => this.protocols.filter(f => !f.Marks).length;

	AbsentText = 'отсутствовал';
	TestName: string;
	isLoading: boolean;

	pageIndex = 0;
	limitToVal = 20;

	constructor(private protocolService: QuestionProtocolService,
		private router: Router,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.isLoading = true;
		this.route.params.subscribe(params => {
			this.projectTestId = params['projectTestId'];
			this.TestName = this.projectTestIds[this.projectTestId];
		});
	}

	ngAfterViewInit() {
		this.protocolService.getAll(this.projectTestId).subscribe(res => {
			this.protocols = res;
			this.isLoading = false;
		});
	}

	changeMarks(participTestId: number) {
		this.router.navigate(['/one-two-three/protocol', participTestId]);
	}

	markAsAbsent(protocol: ProtocolList) {
		this.protocolService.markAsAbsent(protocol.ParticipTestId).subscribe(_ => {
			protocol.Marks = this.AbsentText;
		});
	}

	selectionChange() {
		this.pageIndex = 0;
	}

	projectTestIds: { [projectTestId: number]: string } = {
		2033: 'Русский язык',
		2034: 'Математика',
		2035: 'Чтение',
		2036: 'Русский язык',
		2037: 'Математика',
		2038: 'Чтение',
		2039: 'Русский язык',
		2040: 'Математика',
		2041: 'Чтение'
	};
}
