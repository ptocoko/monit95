export interface Scan {
	SourceName?: string;
	UploadProgress?: number;
	FileContent?: File;
	FileId?: number;
	Status?: 'isUploading' | 'isFailed' | 'isComplete';
}