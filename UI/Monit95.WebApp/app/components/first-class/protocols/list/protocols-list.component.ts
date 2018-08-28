import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ProtocolsService } from '../../../../services/first-class/protocols.service';
import { ProtocolGetModel } from '../../../../models/first-class/protocol-get.model';
import { Router } from '@angular/router';

@Component({
	templateUrl: `./app/components/first-class/protocols/list/protocols-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/first-class/protocols/list/protocols-list.component.css?v=${new Date().getTime()}`]
})
export class ProtocolsListComponent {
	protocols: ProtocolGetModel[] = [];
	processedProtocols = () => this.protocols.filter(f => f.Marks).length;
	notProcessedProtocols = () => this.protocols.filter(f => !f.Marks).length;

	AbsentText = 'отсутствовал';
	pageIndex = 0;
	limitToVal = 20;
	isLoading = true;
	@ViewChild('participFioInput') participFioInput: ElementRef;

	constructor(private protocolsService: ProtocolsService,
		private renderer: Renderer2,
		private router: Router) { }

	ngOnInit() {
		this.isLoading = true;
		this.protocolsService.getAll().subscribe(protocols => {
			this.protocols = protocols;
			this.isLoading = false;
			this.focusOnFioField();
		});
	}

	changeMarks(participTestId: number) {
		this.router.navigate(['/first-class/protocol', participTestId]);
	}

	markAsAbsent(protocol: ProtocolGetModel) {
		this.protocolsService.markAsAbsent(protocol.ParticipTestId).subscribe(_ => {
			protocol.Marks = this.AbsentText;
		});
	}

	selectionChange() {
		this.pageIndex = 0;
	}

	focusOnFioField = () => this.renderer.selectRootElement(this.participFioInput.nativeElement).focus();
}
