export interface Scan {
	SourceName?: string;
	UploadProgress?: number;
	FileContent?: File;
	FileId?: number;
	Url?: string;
	Status?: 'isUploading' | 'isFailed' | 'isComplete';
}