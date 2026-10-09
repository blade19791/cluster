import "dotenv/config";
import cluster from "cluster";

import { createApp } from "./app.js";

const port = process.env.PORT || 5000;
const WORKER_COUNT = 4;
const INTENTIONAL_EXIT_CODE = 0;

const primary = cluster.isPrimary;
const intentionalStops = new Set();
let shuttingDown = false;

function spawn(worker) {
  console.log(`[primary] spawn worker ${worker.id}`);
}

if (primary) {
  for (let i = 0; i < WORKER_COUNT; i++) {
    spawn(cluster.fork());
  }

  cluster.on("exit", (worker, code, signal) => {
    const expected =
      intentionalStops.delete(worker.id) ||
      (signal === null && code === INTENTIONAL_EXIT_CODE);

    if (expected) {
      console.log(
        `[primary] worker ${worker.id} shut down (code ${code}) — not restarting`,
      );
    } else if (shuttingDown) {
      console.error(
        `[primary] worker ${worker.id} crashed during shutdown (code ${code}, signal ${signal})`,
      );
    } else {
      console.error(
        `[primary] worker ${worker.id} crashed (code ${code}, signal ${signal}) — restarting`,
      );
      spawn(cluster.fork());
    }

    if (shuttingDown && Object.keys(cluster.workers).length === 0) {
      console.log("[primary] all workers stopped — exiting");
      process.exit(INTENTIONAL_EXIT_CODE);
    }
  });

  for (const signal of ["SIGTERM", "SIGINT"]) {
    process.on(signal, () => {
      if (shuttingDown) return;
      shuttingDown = true;
      const workers = Object.keys(cluster.workers).length;
      console.log(
        `[primary] received ${signal} — shutting down ${workers} workers`,
      );
      for (const id in cluster.workers) {
        intentionalStops.add(Number(id));
        cluster.workers[id].process.kill("SIGTERM");
      }
    });
  }
} else {
  const workerId = cluster.worker.id;
  const app = createApp(workerId);

  app.listen(port, () => {
    console.log(
      `Server running on port ${port} (Worker: ${workerId}, pid: ${process.pid})`,
    );
  });
}
