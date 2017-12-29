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
    urls: string[] = [];

    constructor() {

    }    

    ngOnInit() {

	}

    readUrl(event: any) {
        let files = event.target.files; // event.target.files is FileList object        
        if (files) {
            for (var i = 0; i < files.length && i < 4; i++) { // не больше 4-х фотографий будут учитываться
                // The FileReader object lets web applications asynchronously read the contents of files stored on the user's computer, 
                // using File object to specify the file to read.
                var fileReader = new FileReader();

                // The fileReader.onload property contains an event handler executed when content read with readAsDataURL is available.
                fileReader.onload = (event: any) => {
                    this.urls.push(event.target.result);
                }

                var file = files.item(i);
                if (file.size / 1024 / 1024 <= 15) {
                    // The readAsDataURL read the contents of the specified File. When the read operation is finished, 
                    // the result attribute contains the data as a URL representing the file's data as a base64 encoded string.
                    fileReader.readAsDataURL(file);
                }                
            }
        }
    }
}
