import { Component, ViewChild, ElementRef } from '@angular/core';
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
import { RsurParticipService } from '../../../../../services/rsur-particip.service';

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
	searchText: string;
	isLoading: boolean = false;

	selectionChange$ = new Subject<any>();
	//searchChange$ = new Subject<any>();
	
	@ViewChild('searchField') searchField: ElementRef;

	constructor(private schoolService: SchoolService, private areaService: AreaService, private rsurParticipService: RsurParticipService) { }

	ngOnInit() {
		this.areaService.getAll().subscribe(areas => this.areas = areas);

		const search$ = fromEvent(this.searchField.nativeElement, 'keyup')
			.pipe(
				debounceTime(1000)
			);

		merge(search$, this.selectionChange$)
			.pipe(
				switchMap(() => {
					this.isLoading = true;
					return this.rsurParticipService.search({
						ActualCode: 0,
						...(this.areaCode && { AreaCode: this.areaCode }),
						...(this.schoolId && { SchoolId: this.schoolId }),
						...(this.searchText && { Search: this.searchText })
					});
				}),
				map((data: RsurParticipModel[]) => {
					this.isLoading = false;
					//this.participsLength = data.TotalCount;
					//this.classes = data.Classes;
					return data;
				})
			).subscribe((particips: RsurParticipModel[]) => this.particips = particips);
	}

	//search() {
	//	this.searchChange$.next({});
	//}

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
}