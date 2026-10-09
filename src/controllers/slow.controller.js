export const slowController = (req, res) => {
  const workerId = req.app.get("workerId");
  const durationMs = Number(req.query.ms) || 3000;
  const start = Date.now();

  console.log(`[worker ${workerId}] /slow started (${durationMs}ms) pid=${process.pid}`);

  setTimeout(() => {
    const elapsedMs = Date.now() - start;
    console.log(`[worker ${workerId}] /slow completed after ${elapsedMs}ms`);

    res.status(200).json({
      workerId,
      pid: process.pid,
      durationMs,
      elapsedMs,
      message: "response finished before shutdown",
    });
  }, durationMs);
};
