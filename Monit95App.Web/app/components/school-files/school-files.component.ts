import { Component, OnInit,  } from '@angular/core';
import { SchoolFileService } from '../../services/school-file.service';

// material
import { MatTableDataSource } from '@angular/material';

@Component({
	selector: 'school-files',
    templateUrl: `./app/components/school-files/school-files.component.html?v=${new Date().getTime()}`,
    styleUrls: [`./app/components/school-files/school-files.component.css?v=${new Date().getTime()}`]
    
})
export class SchoolFilesComponent implements OnInit {
    files: FileItem[];        
    isLoading: boolean = true;    

    displayedColumns = ['проект', 'файл', 'учебный год'];
    dataSource = new MatTableDataSource<FileItem>();
    
    constructor(private readonly schoolFileService: SchoolFileService) {

    }

	ngOnInit() {		
        this.schoolFileService.getFiles().subscribe(response => {
            console.log(response);
            this.files = response as FileItem[];                       
            this.dataSource = new MatTableDataSource<FileItem>(this.files);
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
