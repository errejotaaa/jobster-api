import path from "path";
import { errorHandlerMiddleware } from "./middleware/error-handler";
import { notFound } from "./middleware/not-found";
import { connectDB } from "./db/connect";
import express, { Application, Request, Response, Router } from "express";
import { auth } from "./middleware/authentication";
import { config } from "dotenv";
import "express-async-errors";

config();

export class App {
  private app!: Application;
  constructor(
    private port: string | number,
    private routes: Router[],
    private authRoutes: Router[],
    private middleware: any[]
  ) {
    this.app = express();
    this.setTrustProxy();
    this.setMiddleware();
    this.setRoutes();
    this.setAuthRoutes();
    this.setIndexHTML();
    this.notFound();
    this.errorHandler();
  }

  public setRoutes() {
    this.routes.forEach((r) => {
      this.app.use("/api/v1/auth", r);
    });
  }
  public setAuthRoutes() {
    this.authRoutes.forEach((r) => {
      this.app.use("/api/v1/jobs", auth, r);
    });
  }

  public setMiddleware() {
    this.middleware.forEach((m) => {
      this.app.use(m);
    });
  }

  public notFound() {
    this.app.use(notFound);
  }

  public errorHandler() {
    this.app.use(errorHandlerMiddleware);
  }

  public setIndexHTML() {
    this.app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
    });
  }

  public async listen() {
    try {
      await connectDB(process.env.MONGO_URI);
      this.app.listen(this.port, () => {
        console.log(`listening on port ${this.port}`);
      });
    } catch (error) {}
  }

  public setTrustProxy() {
    this.app.set("trust proxy", 1);
  }
}
