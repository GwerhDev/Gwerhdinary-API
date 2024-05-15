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

async function deleteFileByUrl(fileUrl) {
  try {
    const url = new URL(fileUrl);
    const key = url.pathname.substring(1);

    const deleteParams = {
      Bucket: awsBucket,
      Key: key
    };

    await s3.deleteObject(deleteParams).promise();

    console.log(`Archivo ha sido eliminado de S3.`);
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    throw error;
  }
};

module.exports = {
  getSignedUrl,
  deleteFileByUrl,
};
