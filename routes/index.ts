/*
 * @Desc:
 * @Author: JacksonZhou
 * @Date: 2022/04/26
 * @LastEditTime: 2022/04/26
 */
import { DefaultState } from "koa";
import { ICustomContext } from "../types";
import Router from "koa-router";

const router = new Router<DefaultState, ICustomContext>({ prefix: "/api" });

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
});

export default router;
