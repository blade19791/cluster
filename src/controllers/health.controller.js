export const healthController = (req, res) => {
  try {
    const healthCheck = {
      status: "ok",
      pid: process.pid,
      uptime: process.uptime(),
    };

    res.status(200).json(healthCheck);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
