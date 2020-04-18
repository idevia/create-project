const aws = require("aws-sdk");

const credentials = {
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  region: process.env.S3_REGION
};
const spacesEndpoint = new aws.Endpoint(process.env.S3_SPACE_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  credentials,
  s3ForcePathStyle: true
});

const uploadFile = (data, fileName, contentType) => {
  return new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        ContentEncoding: "base64",
        Body: data,
        ContentType: contentType,
        ACL: "public-read"
      },
      (err, data) => {
        if (err) return reject(err);
        console.log(data)
        resolve(data);
      }
    );
  });
};

const deleteFile = filename => {
  let replaceString = `${process.env.S3_SPACE_ENDPOINT}/${process.env.S3_BUCKET_NAME}/`;
  let key = filename.replace(replaceString, "");
  return new Promise((resolve, reject) => {
    s3.deleteObject(
      {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key
      },
      (err, success) => {
        if (err) reject(err);
        resolve(success);
      }
    );
  });
};

module.exports = {
  uploadFile,
  deleteFile
}