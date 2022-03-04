import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from '../../../school.service';
import { AccountService } from '../../../services/account.service';

@Component({
    templateUrl: `./app/components/particips/home/home.component.html?v=${new Date().getTime()}`
})
export class HomeComponent implements OnInit {
    projectId: number;
    projectName: string;
    date = new Date();
    currentAreaCode: number;

    CHG_schools = ['0319', '0149', '0152'];
    MG_schools = ['0051', '0147', '0053'];
    EST_schools = ['0277', '0278'];
    GK_schools = ['0135', '0015'];
    FG_schools = ['0141', '0142'];
    KM_schools = ['0463', '0465'];

    constructor(private route: ActivatedRoute, public account: AccountService, private schoolService: SchoolService) { }

    ngOnInit() {
        this.route.queryParamMap.subscribe(queryParams => {
            this.projectId = +queryParams.get('projectId');
            this.projectName = queryParams.get('projectName');

            if (this.projectName && this.projectId && !isNaN(this.projectId)) {

            }

            if (this.projectId === 39) {
                this.projectName = 'Функциональная грамотность';
            }
        });

        //const authSub = this.account.auth.subscribe(auth => {
        //    if (auth) {
        //        this.schoolService.getInfo(auth.UserName).subscribe(info => {
        //            this.currentAreaCode = info.AreaCode;
        //            authSub.unsubscribe();
        //        });
        //    }
        //});
    }

    setTimer(day: number, hours: number = 12, minutes: number = 0): boolean {
        return (this.date.getDate() === day && ((this.date.getHours() === hours && this.date.getMinutes() >= minutes) || this.date.getHours() > hours)) || this.date.getDate() > day;
    }
}