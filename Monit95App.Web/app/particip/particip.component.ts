import { Component } from '@angular/core';

@Component({
    selector: 'app-particip',
    template: `<h1>{{welcome}}</h1>`
})
export class ParticipComponent {
    welcome: string;
    constructor() {
        this.welcome = "Welcome to home page";
    };
};