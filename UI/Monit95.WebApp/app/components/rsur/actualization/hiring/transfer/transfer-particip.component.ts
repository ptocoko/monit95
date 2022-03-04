import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { SchoolService } from '../../../../../school.service';
import { AreaService } from '../../../../../services/area.service';
import { AreaModel } from '../../../../../models/area.model';
import { SchoolModel } from '../../../../../models/school.model';
import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { merge } from 'rxjs/observable/merge';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { RsurParticipModel } from '../../../../../models/rsur-particip.model';
import { RsurParticipService, SearchParticips } from '../../../../../services/rsur-particip.service';
import { TablePaginator } from '../../../../../shared/table-paginator/table-paginator';
import { ParticipPostModel } from '../../../../../models/first-class/particip-post.model';
import { RsurParticipPostModel } from '../../../../../models/rsur/particip-post.model';
import { AccountService } from '../../../../../services/account.service';

@Component({
	selector: 'app-transfer-particip',
	templateUrl: `./app/components/rsur/actualization/hiring/transfer/transfer-particip.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/actualization/hiring/transfer/transfer-particip.component.css?v=${new Date().getTime()}`]
})
export class TransferParticipComponent {

	areas: AreaModel[] = [];
	schools: SchoolModel[] = [];
	particips: RsurParticipModel[];

	areaCode: number;
	schoolId: string;
	@Input() searchText: string;
	isLoading: boolean = false;

	pageIndex = 0;
	pageSize = 30;
	totalItems = 0;

	selectionChange$ = new Subject<any>();
	
	@ViewChild('searchField') searchField: ElementRef;
	@ViewChild(TablePaginator) paginator: TablePaginator;

	constructor(private schoolService: SchoolService,
		private areaService: AreaService,
		private rsurParticipService: RsurParticipService,
		private accountService: AccountService) { }

	ngOnInit() {
		this.areaService.getAll().subscribe(areas => this.areas = areas);

		const search$ = fromEvent(this.searchField.nativeElement, 'keyup')
			.pipe(
				debounceTime(1000)
			);

		this.paginator.page.subscribe(() => window.scrollTo(0, 0));

		merge(search$, this.selectionChange$, this.paginator.page)
			.pipe(
			    startWith({}),
				switchMap(() => {
					this.isLoading = true;
					return this.rsurParticipService.search({
						ActualCodes: [0, 2],
						Page: this.pageIndex + 1,
						PageSize: this.pageSize,
						...(this.areaCode && { AreaCode: this.areaCode }),
						...(this.schoolId && { SchoolId: this.schoolId }),
						...(this.searchText && { Search: this.searchText })
					});
				}),
				map((data: SearchParticips) => {
					this.isLoading = false;
					this.totalItems = data.TotalItems;
					return data.Items;
				})
			).subscribe((particips: RsurParticipModel[]) => this.particips = particips);
	}

	areaSelected(areaCode: number) {
		this.selectionChange$.next({});
		if (areaCode) {
			this.schoolService.getByAreaCode(areaCode).subscribe(schools => this.schools = schools);
		} else {
			this.schools = [];
		}
	}

	schoolSelected() {
		this.selectionChange$.next({});
	}

	hire(particip: RsurParticipModel) {
		const part = {
			ActualCode: 3,
			SchoolId: this.accountService.account.UserName,
			SchoolIdFrom: particip.SchoolId
		} as RsurParticipModel;

		this.rsurParticipService.update(particip.Code, part).subscribe(() => particip.ActualCode = 3);
	}

	cancelHiring(particip: RsurParticipModel) {
		const part = {
			ActualCode: 2,
			SchoolId: particip.SchoolIdFrom
		} as RsurParticipModel;

		this.rsurParticipService.update(particip.Code, part).subscribe(() => particip.ActualCode = 2);
	}
}