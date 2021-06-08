import { FileUploadType } from './enums';

export interface FileUpload {
  uploadFile(file: any, type: FileUploadType): any;
  downloadVideo(url: any): any;
  getVideoByRange(startTime: string, endTime: string): any;
}
