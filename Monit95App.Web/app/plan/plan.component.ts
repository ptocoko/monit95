import { Component } from '@angular/core';

@Component({
    selector: 'app-plan',
    template: `<h1>{{welcome}}</h1>`
})
export class PlanComponent {
    welcome: string;
    constructor() {
        this.welcome = "Welcome to about page"
    };
};