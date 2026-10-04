import "dotenv/config";
import cluster from "cluster";

import { createApp } from "./app.js";

const port = process.env.PORT || 5000;

if (cluster.isPrimary) {
  for (let i = 0; i < 4; i++) {
    cluster.fork();
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
