import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { FileService } from './file.service';

export class File {
    ProjectName: string;
    FileName: string;
    FileLink: string;
    PublishedDate: Date;
}

@Component({
    selector: 'file',
    templateUrl: `./app/file/file.component.html?v=${new Date().getTime()}`,
})
export class RsurParticipComponent implements OnInit {
    files: File[] = [];

    constructor(private readonly fileService: FileService) {

    }

    ngOnInit() {
        this.getAllFiles();
    }

    getAllFiles() {
        this.fileService.getAll()
            .subscribe((response: Response) => {
                this.files = response.json() as File[];
            });
    }
};