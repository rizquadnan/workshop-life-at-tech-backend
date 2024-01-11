import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "config";
import AppError from "./v1/utils/appError";

const app = express();

// MIDDLEWARE
// 1.Body Parser
app.use(express.json({ limit: "10kb" }));

// 2. Cookie Parser
app.use(cookieParser());

// 3. Cors
app.use(
  cors({
    origin: [config.get<string>("origin")],
    credentials: true,
  })
);

// 4 Logger
if (config.get("nodeEnv") === "development") app.use(morgan("dev"));

// HEALTH CHECK
app.get("/api/health_check", (_, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to Baret PT API",
  });
});

// UNHANDLED ROUTES
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
});

// GLOBAL ERROR HANDLER
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.get("/", (req, res) => {
  res.json("Welcome to Baret PT API");
});

export default app;
