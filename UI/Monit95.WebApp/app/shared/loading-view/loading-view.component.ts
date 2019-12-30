import { Component, Input } from '@angular/core';

@Component({
	selector: 'spinner-view',
	templateUrl: './loading-view.component.html',
	styleUrls: ['./loading-view.component.css']
})
export class LoadingViewComponent {
	@Input() caption: string;
}