import express from "express";

import healthRoutes from "./routes/health.routes.js";
import workerRoutes from "./routes/worker.routes.js";

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

  app.use("/api", healthRoutes);
  app.use("/api", workerRoutes);

  return app;
}
