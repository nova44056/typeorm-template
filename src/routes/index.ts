import express, { Request, Response } from "express";
import userRouter from "./user.router";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  return res.send({
    message: "Hello World",
  });
});

router.use("/user", userRouter);

export default router;
