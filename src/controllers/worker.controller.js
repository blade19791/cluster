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
