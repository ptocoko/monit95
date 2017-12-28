import { MatPaginatorIntl } from '@angular/material';

export class RussianMatPaginator extends MatPaginatorIntl {
	constructor() {
		super();
		this.nextPageLabel = ' следующая страница';
		this.previousPageLabel = ' предыдущая страница';
		this.itemsPerPageLabel = 'кол-во на странице: ';
		this.getRangeLabel = (page: number, pageSize: number, length: number) => {
			if (length == 0 || pageSize == 0) {
				return `0 из ${length}`;
			}
			length = Math.max(length, 0);
			const startIndex = page * pageSize;
			const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
			return `${startIndex + 1} - ${endIndex} из ${length}`;
		}
	}
}