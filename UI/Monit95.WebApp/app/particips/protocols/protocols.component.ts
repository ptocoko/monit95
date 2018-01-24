import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { ParticipProtocolsService } from '../../services/particip-protocols.service';
import { ParticipProtocolModel } from '../../models/particip-protocol.model';
import { Observable } from 'rxjs/Observable';
import { ParticipFilterPipe } from '../../pipes/particip-filter.pipe';

const PROJECT_TEST_ID: number = 1;

@Component({
	templateUrl: `./app/particips/protocols/protocols.component.html?v=${new Date().getTime()}`
})
export class ProtocolsComponent {
	isOneMatchedProtocol = false;
	AbsentText = 'отсутствовал';
	protocols: ParticipProtocolModel[]
	processedProtocols = () => this.protocols.filter(f => f.Marks).length;
	notProcessedProtocols = () => this.protocols.filter(f => !f.Marks).length;

	@ViewChild('participCodeInput') participCodeInput: ElementRef;
	@ViewChild(ParticipFilterPipe) pipe: ParticipFilterPipe;

	constructor(private participProtocolsService: ParticipProtocolsService,
				private router: Router) { }

	ngOnInit() {
	    this.participProtocolsService.getProtocols(PROJECT_TEST_ID).subscribe(res => {
			console.log(res);
			this.protocols = res;
			$.ready.then(() => this.initCodeListener());
	    });
	}

	private initCodeListener() {
		console.log(this.pipe);
		this.participCodeInput.nativeElement.focus();
		Observable.fromEvent(this.participCodeInput.nativeElement, 'keyup')
			.filter((event: any) => {
				if (event.keyCode === 13) {
					return this.isOneMatchedProtocol;
				}
				else if (this.pipe.transform(this.protocols, event.target.value).length === 1) {
					this.isOneMatchedProtocol = true;
					return false;
				}
				return false;
			})
			.subscribe(event => this.changeMarks(this.getDocumNumberBySearchText(event.target.value)));
	}
	
	markAsAbsent(protocol: ParticipProtocolModel) {
		this.participProtocolsService.markAsAbsent(protocol.ParticipTestId).subscribe(res => {
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