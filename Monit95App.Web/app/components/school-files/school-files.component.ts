import { Component, OnInit } from '@angular/core';
import { SchoolFileService } from '../../services/school-file.service';

@Component({
	selector: 'school-files',
    templateUrl: `./app/components/school-files/school-files.component.html?v=${new Date().getTime()}`
})
export class SchoolFilesComponent implements OnInit {
    files: FileItem[];        
	isLoading: boolean = true;    

    constructor(private readonly schoolFileService: SchoolFileService) {

    }

	ngOnInit() {		
        this.schoolFileService.getFiles().subscribe(response => {
            console.log(response);
            this.files = response as FileItem[];                       
	        this.isLoading = false;
	    });
	}	
}

interface FileItem {
    ProjectName: string;
    Name: string;
    Link: string;        
    Year: string;
}
