import { Injectable, Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    providers: [Http]
})

@Injectable()
export class SchoolService {    
    private ROUTE_PREFIX = 'api/schools'; 

    constructor(private readonly http: Http) { }       

    getAll() {
        return this.http.get(this.ROUTE_PREFIX);
    }    
}