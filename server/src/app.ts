import express, { ErrorHandler, Request, Response, NextFunction } from "express";
import { statusCode } from "express/lib/response";
import httpError from "http-errors";

const app = express();

//authentication middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.headers["authenication"] === "melons") {
    next();
  } else {
    next(httpError(401, "Authentication failed"));
  }
});

//http methods
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

//error handler middleware
app.use((err: Error | typeof httpError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (httpError.isHttpError(err)) {
    return res.status(statusCode).send(err.message);
  }
  return res.status(500).send("Something went wrong");
});

export { app };
