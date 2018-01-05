import { Component, OnInit } from '@angular/core';

@Component({	
	templateUrl: `./app/components/rsur/seminar-reports/create-form/create-form.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/seminar-reports/create-form/create-form.component.css?v=${new Date().getTime()}`]
})
export class SeminarReportCreateFormComponent implements OnInit {
    fotoBase64Strings: string[] = [];
    protocolFileName: string = '';
    readonly maxFileSize = 15728640; // 15 MB 
    maxFiles = 3;
    fileId = 1; // id for first file

    ngOnInit() {
       
    }

    getProtocolFileName(event: any) {        
        const fileList = event.target.files as FileList;        
        if (fileList.length > 0) {
            this.protocolFileName = fileList.item(0).name;
        }
    }

    readBase64Strings(eventTarget: any) {        
        const files = eventTarget.files as FileList; 
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                // The FileReader object lets web applications asynchronously read the contents of files stored on the user's computer, 
                // using File object to specify the file to read.
                const fileReader = new FileReader();

                // The fileReader.onload property contains an event handler executed when content read with readAsDataURL is available.
                fileReader.onload = (event: any) => {
                    const base64EncodedString = event.target.result;
                    if (this.fotoBase64Strings.length < 4 // не больше 4-х фотографий будут учитываться
                        && this.fotoBase64Strings.indexOf(base64EncodedString) === -1) {
                        this.fotoBase64Strings.push(base64EncodedString);
                    }
                };

                const file = files.item(i);
                if (file.size <= this.maxFileSize) {
                    // The readAsDataURL read the contents of the specified File. When the read operation is finished, 
                    // the result attribute contains the data as a URL representing the file's data as a base64 encoded string.
                    fileReader.readAsDataURL(file);
                }
            }

            // Очищаем список, чтобы можно было повторно обработать этот же массив файлов
            eventTarget.value = '';
        }        
    }

    remove(index: number) {
        console.log(index);
        this.fotoBase64Strings.splice(index, 1);
    }
}

interface IImageFile {
    id: number;    
    errorMessage: string;
    isProtocol: boolean;
    file: File;
    base64String?: string; // ProtocolFile do not use this property
}