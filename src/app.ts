import dotenv from "dotenv";
import express from "express";
import httpContext from "express-http-context";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import logger from "./logger";

dotenv.config();
let reqId = 0;
// Create Express server
const app = express();
app.set("trust proxy", 1);

const apiLimiter = rateLimit({
  windowMs: 3000, // 3 seconds
  max: 1, // Limit each IP to 1 request per `window`
  message: "🤨",
});

app.use(apiLimiter);
app.use(httpContext.middleware);
// Set the Id to be used in the logs
app.use(function (req, res, next) {
  httpContext.ns.bindEmitter(req);
  httpContext.ns.bindEmitter(res);
  // Assign an Id to each request or reuse it if it already exists

  if (req.headers["logger-req-id"]) {
    reqId = +req.headers["logger-req-id"];
  } else {
    reqId++;
  }

  httpContext.set("reqId", reqId);
  // set the req-id to every response
  res.setHeader("logger-req-id", reqId);
  logger.notice("", { req: req });

  next();
});

app.use(
  morgan(":status", {
    stream: {
      write: (message: string) => {
        logger.notice(message.trim(), { isFromMorgan: true });
      },
    },
  })
);

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
