import { overlayData1, markData1 } from "./mock/video";
import Koa from "koa";
import consola from "consola";
import websockify from "koa-websocket";
import fs from "fs";

const wsOptions = {};
const app = websockify(new Koa(), wsOptions);

app.ws.use((ctx, next) => {
  return next(ctx);
});

app.ws.use((ctx) => {
  ctx.websocket.send("===Hello");
  ctx.websocket.on("message", function (msg) {
    // 处理客户端发过来的文本数据
    if (typeof msg === "string") {
      try {
        const data = JSON.parse(msg);
        if (data.type === "testBufferData") {
          // setInterval(() => {
          const file = fs.readFileSync("./static/image/img0.jpg");
          // 往客户端发送二进制数据
          ctx.websocket.send(file);
          ctx.websocket.send(
            JSON.stringify({
              type: "imgData",
              marks: markData1,
              overlay: overlayData1,
            })
          );
          // }, 2000);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      // 处理客户端发过来的二进制数据
    }
  });
  ctx.websocket.on("close", () => {
    console.log("===close websocket");
  });
});

/**
 * Create HTTP server.
 */
const host = process.env.HOST || "localhost";
const port = Number(process.env.PORT) || 3002;

const server = app.listen(port, host, () => {
  consola.ready({
    message: `websocket server listening on ws://${host}:${port}`,
    badge: true,
  });
});
server.timeout = 60000;
