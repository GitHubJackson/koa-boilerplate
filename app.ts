import Koa from "koa";
import koaBody from "koa-body";
import views from "koa-views";
import koaStatic from "koa-static";
import consola from "consola";
import path from "path";
import Router from "koa-router";
import cors from "koa2-cors";
import userRouter from "./routes/user";
import homeRouter from "./routes";

const router = new Router();
const app = new Koa();

app.use(
  cors({
    origin: function (ctx) {
      // 设置允许来自指定域名请求
      if (ctx.url === "/test") {
        return "*";
      }
      return "http://localhost:8080";
    },
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
  })
);

app.use(
  koaBody({
    multipart: true,
    formidable: {
      // the max size of uploading file
      maxFileSize: 200 * 1024 * 1024,
    },
  })
);
app.use(
  views(path.join(__dirname, "./views"), {
    extension: "ejs",
  })
);

// 静态资源目录(相对入口文件app.ts)
const staticPath = "./static";
app.use(koaStatic(path.join(__dirname, staticPath)));
// 子路由
app.use(homeRouter.routes()).use(homeRouter.allowedMethods());
app.use(userRouter.routes()).use(router.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

/**
 * Create HTTP server.
 */
const host = process.env.HOST || "localhost";
const port = Number(process.env.PORT) || 3000;

const server = app.listen(port, host, () => {
  consola.ready({
    message: `http server listening on http://${host}:${port}`,
    badge: true,
  });
});
server.timeout = 60000;
