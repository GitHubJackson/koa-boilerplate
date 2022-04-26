/*
 * @Desc:
 * @Author: JacksonZhou
 * @Date: 2020/07/26
 * @LastEditTime: 2022/04/26
 */
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import consola from "consola";
import router from "./routes";

const app = new Koa();
app.use(bodyParser());
app.use(router.routes());

/**
 * Create HTTP server.
 */
const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT) || 3001;

const server = app.listen(port, host, () => {
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
});
server.timeout = 60000;
