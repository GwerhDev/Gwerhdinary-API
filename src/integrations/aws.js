const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { awsBucket, awsAccessKey, awsSecretKey, awsRegion } = require('../config');

AWS.config.update({
  region: awsRegion,
  accessKeyId: awsAccessKey,
  secretAccessKey: awsSecretKey,
  signatureVersion: 'v4',
});

const s3 = new AWS.S3();

async function getSignedUrl(data) {
  const filePath = `${data.clientId}/${data.mimetype}/${uuidv4()}.${data.ex}`;
  const params = {
    Bucket: awsBucket,
    Key: filePath,
    Expires: 3600,
    ContentType: data.mimetype,
  };

  const presigned = s3.getSignedUrl('putObject', params); 
  const url = `https://${awsBucket}.s3.${awsRegion}.amazonaws.com/${filePath}`;
  const formattedResponse =  { presigned, url };

  return formattedResponse;
};

async function uploadFileToS3(file) {
  try {
    const fileName = `${file.clientId}/${file.mediatype}/${uuidv4()}_${file.originalname}`;
    const uploadParams = {
      Bucket: awsBucket,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype
    };
    const result = await s3.upload(uploadParams).promise();
    return result.Location;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
};

async function deleteFileFromS3ByUrl(fileUrl) {
  try {
    const urlParts = fileUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const filePath = urlParts.slice(3).join('/');

    const deleteParams = {
      Bucket: awsBucket,
      Key: filePath + '/' + fileName
    };
    await s3.deleteObject(deleteParams).promise();

    console.log(`Archivo ${fileName} eliminado de S3.`);
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    throw error;
  }
};

module.exports = {
  getSignedUrl,
  uploadFileToS3,
  deleteFileFromS3ByUrl,
};
