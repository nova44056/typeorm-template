import multer from "multer";
import { multerS3Config } from "./multerS3.config";
const fileFilter = (_req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const s3ImageUpload = multer({
  storage: multerS3Config,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 100, // we are allowing only 100 MB files
  },
});
