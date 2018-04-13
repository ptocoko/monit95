import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-table-paginator',
	templateUrl: `./app/shared/table-paginator/table-paginator.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/shared/table-paginator/table-paginator.css?v=${new Date().getTime()}`]
})
export class TablePaginator {
	@Input() pageIndex: number;
	@Output() pageIndexChange = new EventEmitter<number>();

	@Input() length: number;
	private maxPageIndex: number;

	@Input() pageSizeOptions: number[];

	@Input() pageSize: number;
	@Output() pageSizeChange = new EventEmitter<number>();

	ngDoCheck() {
		this.maxPageIndex = this.length / this.pageSize;
	}

	toPrev() {
		if (this.pageIndex >= 1) {
			this.pageIndexChange.emit(--this.pageIndex)
		}
	}

	toNext() {
		if (this.pageIndex < this.maxPageIndex - 1) {
			this.pageIndexChange.emit(++this.pageIndex);
		}
	}

	sizeChange() {
		this.pageSizeChange.emit(this.pageSize);
		this.pageIndex = 0;
		this.pageIndexChange.emit(this.pageIndex);
	}
}