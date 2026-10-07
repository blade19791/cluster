import express from "express";

import healthRoutes from "./routes/health.routes.js";
import workerRoutes from "./routes/worker.routes.js";
import testRoutes from "./routes/test.routes.js";

export function createApp(workerId) {
  const app = express();

  app.set("workerId", workerId);

  //middleware
  app.use(express.json());

  app.use((req, res, next) => {
    res.set("X-Worker-Id", String(workerId));
    next();
  });

  //routes
  app.get("/", (req, res) => {
    res.send(`Hello from worker ${workerId} (pid: ${process.pid})\n`);
  });

  app.use("/health", healthRoutes);
  app.use("/worker", workerRoutes);
  app.use("/test", testRoutes);

  return app;
}
