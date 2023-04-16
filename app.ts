import { App } from "./application-config";
import authRoutes from "./routes/auth";
import jobsRoutes from "./routes/jobs";
import { middleware } from "./middleware/middleware";

const port = process.env.PORT || 8000;

const app = new App(port, [authRoutes], [jobsRoutes], middleware);

app.listen();
