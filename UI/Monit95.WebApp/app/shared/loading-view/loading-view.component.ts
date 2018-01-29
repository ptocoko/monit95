import { Component, Input } from '@angular/core';

@Component({
	selector: 'spinner-view',
	templateUrl: `./app/shared/loading-view/loading-view.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/shared/loading-view/loading-view.component.css?v=${new Date().getTime()}`]
})
export class LoadingViewComponent {
	@Input() caption: string;
}