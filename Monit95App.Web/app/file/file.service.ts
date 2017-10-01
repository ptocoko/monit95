import { Injectable, Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    providers: [Http]
})

@Injectable()
export class FileService {
    private ROUTE_PREFIX = 'api/Files';

    constructor(private readonly http: Http) {
        
    }

    getAll() {
        return this.http.get(this.ROUTE_PREFIX);
    }        
}