import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();
export const s3Config: AWS.S3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
} as any);
