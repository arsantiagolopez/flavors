import aws from "aws-sdk";
import { v4 } from "uuid";

// Update aws credentials
aws.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_MYAPP,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_MYAPP,
  },
  region: process.env.AWS_REGION_MYAPP,
  bucketname: process.env.AWS_BUCKET_NAME,
});

// New S3 class
const s3 = new aws.S3();

/**
 * Generates upload URL from AWS. URL expires in 5 seconds.
 * @method GET.
 * @param {object} req - http request, including the userId.
 * @param {object} res - http response.
 * @returns a string of a working upload URL.
 */
const generateUploadURL = async ({ userId }, res) => {
  try {
    const imageName = `${userId}/${v4()}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageName,
      Expires: 5,
    };

    const url = await s3.getSignedUrlPromise("putObject", params);

    return res.status(200).json({ success: true, url });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Something went wrong. Please try again later.",
      },
    });
  }
};

/**
 * Deletes image object from s3 bucket.
 * @method POST.
 * @param {object} req - http request, including body and userId.
 * @param {object} res - http response.
 * @returns a string of a success message if image deleted.
 */
const deleteImageFromBucket = async ({ body, userId }, res) => {
  try {
    const { url } = body;

    // Passed URL is in the format: https://[bucket].s3.[region].amazonaws.com/[userId]/[imageId]
    // Split URL and get necessary imageId
    const str = url.split("/");
    const imageId = str[str.length - 1];
    const imageName = `${userId}/${imageId}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageName,
    };

    // Delete object from bucket
    await s3.deleteObject(params).promise();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Something went wrong. Please try again later.",
      },
    });
  }
};

export { generateUploadURL, deleteImageFromBucket };
