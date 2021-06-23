import { s3ImageUpload } from "./../s3/index";
import { Response } from "express";
import { Request } from "express";
import express from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  return res.status(200).send("This is user route.");
});

export default router;
