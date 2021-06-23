import express, { Application } from "express";
import mogran from "morgan";
import "reflect-metadata";
import { createConnection } from "typeorm";
import Router from "./routes";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import dotenv from "dotenv";
import { s3ImageUpload } from "./s3";

dotenv.config();
const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

/**
 * Initializing express app
 */
const PORT = process.env.PORT || 8000;
const app: Application = express();
/**
 * Middleware
 */
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", // client uri here
  })
);
app.use(
  session({
    name: "connect.sid",
    store: new RedisStore({
      client: redisClient,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 31,
      httpOnly: true,
      sameSite: "lax",
    },
    saveUninitialized: false,
    secret: "", // secret here
    resave: false,
  })
);
app.use(express.json());
app.use(s3ImageUpload.single("image")); // image upload key here
app.use(mogran("tiny"));
app.use("/api", Router);

/**
 * connect to database
 */
createConnection()
  .then(async (_connection) => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
