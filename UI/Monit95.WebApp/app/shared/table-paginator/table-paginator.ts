import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-table-paginator',
	templateUrl: `./table-paginator.html`,
	styleUrls: [`./table-paginator.css`]
})
export class TablePaginator {
	@Input() pageIndex: number;
	@Output() pageIndexChange = new EventEmitter<number>();

	@Input() length: number;
	maxPageIndex: number;

	@Input() pageSizeOptions: number[] = [30, 60, 100];

	@Input() pageSize: number = 30;
	@Output() pageSizeChange = new EventEmitter<number>();

	change$ = new Subject<any>();
	page = this.change$.asObservable();

	ngDoCheck() {
		this.maxPageIndex = Math.floor(this.length / this.pageSize);
	}

	toPrev() {
		if (this.pageIndex >= 1) {
			this.pageIndexChange.emit(--this.pageIndex)
			this.change$.next({});
		}
	}

	toNext() {
		if (this.pageIndex < this.maxPageIndex) {
			this.pageIndexChange.emit(++this.pageIndex);
			this.change$.next({});
		}
	}

	sizeChange() {
		this.pageSizeChange.emit(this.pageSize);
		this.pageIndex = 0;
		this.pageIndexChange.emit(this.pageIndex);
		this.change$.next({});
	}
}