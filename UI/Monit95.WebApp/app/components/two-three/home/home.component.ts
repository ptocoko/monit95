import { Component } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { AccountService } from '../../../services/account.service';
import { getFileExtension } from '../../../utils/functions';

@Component({
	templateUrl: `./app/components/two-three/home/home.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/two-three/home/home.component.css?v=${new Date().getTime()}`]
})
export class HomeComponent { }

