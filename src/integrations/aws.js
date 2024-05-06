const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { awsKey, awsSecret, awsBucket } = require('../config');

AWS.config.update({
  accessKeyId: awsKey,
  secretAccessKey: awsSecret
});

const s3 = new AWS.S3();

async function uploadFileToS3(file) {
  try {
    const fileName = `${uuidv4()}_${file.originalname}`;
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

function getFileUrlFromS3(fileName, folder) {
  try {
    const fileUrl = s3.getSignedUrl('getObject', {
      Bucket: awsBucket + folder,
      Key: fileName,
      Expires: 3600
    });
    return fileUrl;
  } catch (error) {
    console.error('Error getting file URL from S3:', error);
    throw error;
  }
};

module.exports = {
  uploadFileToS3,
  getFileUrlFromS3
};
