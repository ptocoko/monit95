﻿import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";
import { ParticipProtocolsService } from '../../services/particip-protocols.service';
import { ParticipProtocolModel } from '../../models/particip-protocol.model';
import { Observable } from 'rxjs/Observable';
import { ParticipFilterPipe } from '../../pipes/particip-filter.pipe';

const PROJECT_TEST_ID: number = 1;

@Component({
	templateUrl: `./app/particips/protocols/protocols.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/particips/protocols/protocols.component.css?v=${new Date().getTime()}`]
})
export class ProtocolsComponent {
	isOneMatchedProtocol = false;
	AbsentText = 'отсутствовал';
	protocols: ParticipProtocolModel[]
	processedProtocols = () => this.protocols.filter(f => f.Marks).length;
	notProcessedProtocols = () => this.protocols.filter(f => !f.Marks).length;

	@ViewChild('participCodeInput') participCodeInput: ElementRef;
	pipe = new ParticipFilterPipe();

	constructor(private participProtocolsService: ParticipProtocolsService,
				private router: Router) { }

	ngOnInit() {
	    this.participProtocolsService.getProtocolsList(PROJECT_TEST_ID).subscribe(res => {
			this.protocols = res;
			$().ready(() => this.initCodeListener());
	    });
	}

	private initCodeListener() {
		this.participCodeInput.nativeElement.focus();

		Observable.fromEvent(this.participCodeInput.nativeElement, 'keyup')
			.filter((event: any) => {
				console.log(event);
				if (event.keyCode === 13) {
					return this.isOneMatchedProtocol;
				}
				else if (this.pipe.transform(this.protocols, event.target.value).length === 1) {
					this.isOneMatchedProtocol = true;
					return false;
				}
				else {
					this.isOneMatchedProtocol = false;
					return false;
				}
			})
			.subscribe(event => this.changeMarks(this.getDocumNumberBySearchText(event.target.value)));
	}
	
	markAsAbsent(protocol: ParticipProtocolModel) {
		this.participProtocolsService.markAsAbsent(protocol.DocumNumber).subscribe(res => {
			protocol.Marks = this.AbsentText;
		});
	}

	changeMarks(documNumber: number) {
		this.router.navigate(['/particips/protocol', documNumber])
	}

	getDocumNumberBySearchText(searchText: string) {
		return this.pipe.transform(this.protocols, searchText)[0].DocumNumber;
	}
}