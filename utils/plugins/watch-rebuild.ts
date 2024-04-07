import type { PluginOption } from "vite";
import { WebSocket } from "ws";
import MessageInterpreter from "../reload/interpreter";
import { LOCAL_RELOAD_SOCKET_URL } from "../reload/constant";

export default function watchRebuild(config: { afterWriteBundle: () => void }): PluginOption {
  const ws = new WebSocket(LOCAL_RELOAD_SOCKET_URL);
  return {
    name: "watch-rebuild",
    writeBundle() {
      ws.send(MessageInterpreter.send({ type: "build_complete" }));

      sendNextQueue(() => {
        config.afterWriteBundle();
      });
    },
  };
}

function sendNextQueue(callback: () => void) {
  setTimeout(() => {
    callback();
  }, 0);
}
