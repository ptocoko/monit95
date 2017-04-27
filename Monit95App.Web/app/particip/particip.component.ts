import { Component } from '@angular/core';

@Component({
    selector: 'app-particip',
    templateUrl: './app/particip/participlistv2.html'
})
export class ParticipComponent {
    welcome: string;
    constructor() {
        this.welcome = "Welcome to home page";
    };
};