import { Component, Input, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-stacked-bar',
	templateUrl: './stacked-bar.component.html',
	styleUrls: ['./stacked-bar.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackedBarComponent implements OnChanges {
	@Input() values: number[];
	@Input() colorScheme: string[];
	@Input() legend: string[];

	percentsAndValues: IPercentValue[];

	ngOnChanges(changes: SimpleChanges) {
		if (changes['values'] || changes['legend'] || changes['colorScheme']) {
			const sumOfValues = this.values.reduce((curr, aggr) => aggr += curr, 0);
			this.percentsAndValues = this.values.map((val, i) => {
				let percentToView = Math.round((val / sumOfValues) * 100) + '';
				if (percentToView === '0') {
					percentToView = '';
				} else {
					percentToView += '%';
				}

				return {
					percent: val / sumOfValues,
					value: val,
					percentToView,
					legend: this.legend[i],
					backColor: this.colorScheme[i]
				}
			});
		}
	}
}

interface IPercentValue {
	value: number;
	percent: number;
	percentToView: string;
	backColor: string;
	legend: string;
}