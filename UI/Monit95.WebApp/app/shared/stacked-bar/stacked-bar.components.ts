import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
	selector: 'app-stacked-bar',
	templateUrl: `./app/shared/stacked-bar/stacked-bar.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/shared/stacked-bar/stacked-bar.component.css?v=${new Date().getTime()}`]
})
export class StackedBarComponent implements OnChanges {
	@Input() values: number[];
	@Input() colorScheme: string[];

	percentsAndValues: IPercentValue[];

	ngOnChanges(changes: SimpleChanges) {
		if (changes['values']) {
			const sumOfValues = this.values.reduce((curr, aggr) => aggr += curr, 0);
			this.percentsAndValues = this.values.map(val => {
				return {
					percent: val / sumOfValues,
					value: val
				}
			});
		}
	}

	getColorFromScheme(index: number) {
		return this.colorScheme[index];
	}
}

interface IPercentValue {
	value: number;
	percent: number;
}