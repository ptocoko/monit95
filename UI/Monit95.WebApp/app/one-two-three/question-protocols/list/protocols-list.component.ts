import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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
	@ViewChild('participFioInput') participFioInput: ElementRef;

	pageIndex = 0;
	limitToVal = 20;

	constructor(private protocolService: QuestionProtocolService,
		private router: Router,
		private route: ActivatedRoute,
		private renderer: Renderer2) { }

	ngOnInit() {
		this.isLoading = true;
		this.route.params.subscribe(params => {
			this.projectTestId = params['projectTestId'];
			// this.TestName = this.projectTestIds[this.projectTestId];
		});

		this.route.queryParamMap.subscribe(queryParams => {
			this.TestName = queryParams.get('subjectName');
		});
	}

	ngAfterViewInit() {
		this.protocolService.getAll(this.projectTestId).subscribe(res => {
			this.protocols = res;
			this.isLoading = false;
			this.focusOnFioField();
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

	focusOnFioField = () => this.renderer.selectRootElement(this.participFioInput.nativeElement).focus();

	projectTestIds: { [projectTestId: number]: string } = {
		3092: 'Русский язык',
		3093: 'Математика',
		3094: 'Чтение',
		3095: 'Русский язык',
		3096: 'Математика',
		3097: 'Чтение',
		3098: 'Русский язык',
		3099: 'Математика',
		3100: 'Чтение'
	};
}
