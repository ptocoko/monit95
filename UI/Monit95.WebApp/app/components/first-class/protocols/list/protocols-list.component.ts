import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ProtocolsService } from '../../../../services/first-class/protocols.service';
import { ProtocolGetModel, ProtocolsList } from '../../../../models/first-class/protocol-get.model';
import { Router } from '@angular/router';
import { Subject ,  fromEvent ,  merge ,  Observable } from 'rxjs';
import { debounceTime ,  startWith ,  switchMap ,  map } from 'rxjs/operators';
import { TablePaginator } from '../../../../shared/table-paginator/table-paginator';
import { ClassModel } from '../../../../models/class.model';

@Component({
	templateUrl: './protocols-list.component.html',
	styleUrls: ['./protocols-list.component.css']
})
export class ProtocolsListComponent {
	protocols: ProtocolGetModel[] = [];
	processedProtocols = 0; //= () => this.protocols.filter(f => f.Marks).length;
	notProcessedProtocols = 0; //() => this.protocols.filter(f => !f.Marks).length;

	classes: ClassModel[] = [];

	AbsentText = 'отсутствовал';
	isLoading = true;
	searchText: string;
	searchClass: string;
	@ViewChild('participFioInput') participFioInput: ElementRef;
	
	pageIndex = 0;
	limitToVal = 20;
	protocolsLength = 0;

	selectionChange$ = new Subject<any>();
	@ViewChild(TablePaginator) paginator: TablePaginator;

	constructor(private protocolsService: ProtocolsService,
		private renderer: Renderer2,
		private router: Router) { }

	ngOnInit() {
		this.isLoading = true;
		//this.protocolsService.getAll().subscribe(protocols => {
		//	this.protocols = protocols;
		//	this.isLoading = false;
		//	this.focusOnFioField();
		//});
		const search$ = fromEvent(this.participFioInput.nativeElement, 'input')
			.pipe(
				debounceTime(1000)
			);
		search$.subscribe(() => this.pageIndex = 0);

		merge(this.paginator.page, search$, this.selectionChange$)
			.pipe(
				startWith({}),
				switchMap(() => {
					this.protocols = [];
					this.isLoading = true;
					return this.createRequest();
				}),
				map((data: ProtocolsList) => {
					this.isLoading = false;

					this.protocolsLength = data.TotalCount;
					this.classes = data.Classes;

					this.processedProtocols = data.ProcessedItemsCount;
					this.notProcessedProtocols = data.NotProcessedItemsCount;

					return data.Items;
				})
			).subscribe((protocols: ProtocolGetModel[]) => this.protocols = protocols);
	}

	private createRequest(): Observable<ProtocolsList> {
		return this.protocolsService.getAll({
			page: this.pageIndex + 1,
			length: this.limitToVal,
			search: this.searchText,
			classId: this.searchClass
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
		this.selectionChange$.next({});
	}

	focusOnFioField = () => this.renderer.selectRootElement(this.participFioInput.nativeElement).focus();
}
