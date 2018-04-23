import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
	selector: 'app-table-paginator',
	templateUrl: `./app/shared/table-paginator/table-paginator.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/shared/table-paginator/table-paginator.css?v=${new Date().getTime()}`]
})
export class TablePaginator {
	@Input() private pageIndex: number;
	@Output() private pageIndexChange = new EventEmitter<number>();

	@Input() length: number;
	private maxPageIndex: number;

	@Input() pageSizeOptions: number[];

	@Input() pageSize: number;
	@Output() pageSizeChange = new EventEmitter<number>();

	private change$ = new Subject<any>();
	page = this.change$.asObservable();

	ngDoCheck() {
		this.maxPageIndex = this.length / this.pageSize;
		//this.page = this.change$.asObservable();
	}

	private toPrev() {
		if (this.pageIndex >= 1) {
			this.pageIndexChange.emit(--this.pageIndex)
			this.change$.next({});
		}
	}

	private toNext() {
		if (this.pageIndex < this.maxPageIndex - 1) {
			this.pageIndexChange.emit(++this.pageIndex);
			this.change$.next({});
		}
	}

	private sizeChange() {
		this.pageSizeChange.emit(this.pageSize);
		this.pageIndex = 0;
		this.pageIndexChange.emit(this.pageIndex);
		this.change$.next({});
	}
}