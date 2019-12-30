import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ProtocolList } from '../../../models/one-two-three/protocol-list.model';
import { QuestionProtocolService } from '../../../services/one-two-three/question-protocols.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NumberCodes } from '../../NumberCodes';

@Component({
	templateUrl: './protocols-list.component.html',
	styleUrls: ['./protocols-list.component.css']
})
export class ProtocolsListComponent {
	projectTestId: number;
	protocols: ProtocolList[] = [];
	processedProtocols = () => this.protocols.filter(f => f.Marks).length;
	notProcessedProtocols = () => this.protocols.filter(f => !f.Marks).length;

	AbsentText = 'отсутствовал';
	searchText: string;
	searchClass: string;
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
			this.TestName = this.projectTestIds[this.projectTestId];
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
		3069: 'Русский язык',
		3070: 'Математика',
		3071: 'Чтение',
		3072: 'Русский язык',
		3073: 'Математика',
		3074: 'Чтение',
		3075: 'Русский язык',
		3076: 'Математика',
		3077: 'Чтение'
	};
}
