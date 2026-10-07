export const testController = (req, res) => {
  try {
    const testInfo = {
      message: "Request handled sucessfully",
      worker: process.pid,
      workerId: req.app.get("workerId"),
    };

    res.status(200).json(testInfo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
