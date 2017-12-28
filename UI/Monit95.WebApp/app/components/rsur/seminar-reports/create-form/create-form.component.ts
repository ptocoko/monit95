import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SeminarReportService } from '../../../../services/seminar-report.service';
import { BasicValidators } from '../../../../shared/basic-validators';

@Component({	
	templateUrl: `./app/components/rsur/seminar-reports/create-form/create-form.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/seminar-reports/create-form/create-form.component.css?v=${new Date().getTime()}`]
})
export class SeminarReportCreateFormComponent implements OnInit {
    url: string;

    constructor() {

    }    

    ngOnInit() {

	}

    readUrl(event: any) {
        // event.target.files is FileList
        if (event.target.files) {
            let fileList = new FileList();

            // The FileReader object lets web applications asynchronously read the contents of files stored on the user's computer, 
            // using File object to specify the file to read.
            var fileReader = new FileReader();

            // The fileReader.onload property contains an event handler executed when content read with readAsDataURL is available.
            fileReader.onload = (event: any) => {
                this.url = event.target.result;
            }

            // The readAsDataURL read the contents of the specified File. When the read operation is finished, 
            // the result attribute contains the data as a URL representing the file's data as a base64 encoded string.
            fileReader.readAsDataURL(event.target.files[0]);
        }
    }	
}
