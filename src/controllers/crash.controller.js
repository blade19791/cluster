export const crashController = (req, res) => {
  try {
    res
      .status(200)
      .json({
        message: `Worker { ${process.pid}} died, starting a new worker`,
      });
    process.exit(1);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
