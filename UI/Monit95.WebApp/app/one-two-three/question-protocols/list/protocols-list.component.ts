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
	numberCode: string;
	protocols: ProtocolList[] = [];
	processedProtocols = () => this.protocols.filter(f => f.Marks).length;
	notProcessedProtocols = () => this.protocols.filter(f => !f.Marks).length;

	AbsentText = 'отсутствовал';
	TestName: string;

	pageIndex = 0;
	limitToVal = 20;

	constructor(private protocolService: QuestionProtocolService,
		private router: Router,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.numberCode = params['numberCode'];
			this.TestName = this.numberCodes[this.numberCode];
		});
	}

	ngAfterViewInit() {
		this.protocolService.getAll(this.numberCode).subscribe(res => this.protocols = res);
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

	numberCodes: { [numberCode: string]: string } = {
		'01': 'Русский язык',
		'02': 'Математика',
		'03': 'Чтение'
	};
}
