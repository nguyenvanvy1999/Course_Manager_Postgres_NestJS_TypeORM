import AWS from 'aws-sdk';
import { catchError } from 'src/common/exceptions';
import { FileUpload, FileUploadType } from '../interfaces';
import { Readable } from 'stream';

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

export class FileUploadByS3 implements FileUpload {
  public downloadVideo(url: string): Readable {
    try {
      const urlKey = `${process.env.AWS_S3_FOLDER}/${url}`;
      const options = { Bucket: process.env.AWS_S3_BUCKET_NAME, Key: urlKey };
      return s3.getObject(options).createReadStream();
    } catch (error) {
      catchError(error);
    }
  }

  public getVideoByRange(startTime: string, endTime: any) {
    console.log(startTime, endTime);
    throw new Error('Method not implemented.');
  }

  public async uploadFile(file: Express.Multer.File, type: FileUploadType) {
    try {
      const fileType = file.originalname.split('.').pop();
      const fileName = new Date().getTime();
      const urlKey = `${process.env.AWS_S3_FOLDER}/${type}/${fileName}.${fileType}`;
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: urlKey,
        ACL: 'public-read',
        ContentType: file.mimetype,
      };
      const uploadPromise =
        file.size <= 6000000
          ? await s3.upload({ ...params, Body: file.buffer }).promise()
          : await this.uploadMultiplePart(file, params);
      return uploadPromise.Location;
    } catch (error) {
      catchError(error);
    }
  }

  public async uploadMultiplePart(
    file: Express.Multer.File,
    multiPartParams: any,
  ) {
    try {
      let partNum = 0;
      const partSize = 1024 * 1024 * 5; // 5MB
      const multipartMap = {
        Parts: [],
      };
      return s3
        .createMultipartUpload(multiPartParams)
        .promise()
        .then(async (multipart) => {
          const partParams = [];
          for (let start = 0; start < file.buffer.length; start += partSize) {
            partNum++;
            const end = Math.min(start + partSize, file.buffer.length);
            partParams.push({
              Body: file.buffer.slice(start, end),
              Bucket: multiPartParams.Bucket,
              Key: multiPartParams.Key,
              PartNumber: String(partNum),
              UploadId: multipart.UploadId,
            });
          }
          const uploadPartPromises = partParams.map(async (partParam) => {
            await s3
              .uploadPart(partParam)
              .promise()
              .then((partData) => {
                multipartMap.Parts[partParam.PartNumber - 1] = {
                  ETag: partData.ETag,
                  PartNumber: Number(partParam.PartNumber),
                };
              });
          });
          await Promise.all(uploadPartPromises);
          const doneParams = {
            Bucket: multiPartParams.Bucket,
            Key: multiPartParams.Key,
            MultipartUpload: multipartMap,
            UploadId: multipart.UploadId,
          };
          return s3.completeMultipartUpload(doneParams).promise();
        });
    } catch (error) {
      catchError(error);
    }
  }
}
