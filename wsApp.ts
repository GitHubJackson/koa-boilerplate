import Koa from "koa";
import consola from "consola";
import websockify from "koa-websocket";

const wsOptions = {};
const app = websockify(new Koa(), wsOptions);

app.ws.use((ctx, next) => {
  return next(ctx);
});

app.ws.use((ctx) => {
  ctx.websocket.send("===Hello");
  ctx.websocket.on("message", function (msg) {
    console.log("===recive msg", msg);
  });
  ctx.websocket.on("close", () => {
    console.log("===close websocket");
  });
});

//  TODO 发送二进制数据

/**
 * Create HTTP server.
 */
const host = process.env.HOST || "localhost";
const port = Number(process.env.PORT) || 3001;

const server = app.listen(port, host, () => {
  consola.ready({
    message: `websocket server listening on ws://${host}:${port}`,
    badge: true,
  });
});
server.timeout = 60000;
