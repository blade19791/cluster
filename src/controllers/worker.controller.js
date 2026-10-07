export const workerController = (req, res) => {
  try {
    const workerInfo = {
      workerId: req.app.get("workerId"),
      pid: process.pid,
      ppid: process.ppid,
      uptime: process.uptime(),
    };

    res.status(200).json(workerInfo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const workerStatusController = (req, res) => {
  try {
    const { rss, heapUsed, heapTotal } = process.memoryUsage();
    const workerStats = {
      workerId: req.app.get("workerId"),
      pid: process.pid,
      uptime: process.uptime(),
      memory: {
        rss: rss,
        heapUsed: heapUsed,
        heapTotal: heapTotal,
      },
    };

    res.status(200).json(workerStats);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
