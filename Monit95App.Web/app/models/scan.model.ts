export interface Scan {
	Number?: number;
	SourceName?: string;
	UploadProgress?: number;
	FileContent?: File;
	FileId?: number;
	Status?: 'isUploading' | 'isFailed' | 'isComplete';
}