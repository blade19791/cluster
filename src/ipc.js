const DEFAULT_TIMEOUT_MS = 3000;

export function askPrimary(type, replyType = type, timeoutMs = DEFAULT_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    if (typeof process.send !== "function") {
      reject(new Error("no IPC channel to primary"));
      return;
    }

    const requestId = `${process.pid}:${Date.now()}:${Math.random()}`;

    const onMessage = (msg) => {
      if (msg?.type === replyType && msg?.requestId === requestId) {
        cleanup();
        resolve(msg.data);
      }
    };

    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(`primary did not respond to ${type} in ${timeoutMs}ms`));
    }, timeoutMs);

    const cleanup = () => {
      clearTimeout(timer);
      process.removeListener("message", onMessage);
    };

    process.on("message", onMessage);
    process.send({ type, requestId });
  });
}
