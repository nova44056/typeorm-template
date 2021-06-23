import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";
import { s3Config } from "./s3.config";

dotenv.config();
export const multerS3Config: multer.StorageEngine = multerS3({
  s3: s3Config,
  bucket: String(process.env.AWS_BUCKET_NAME),
  acl: "public-read",
  metadata: function (_req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (_req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});
