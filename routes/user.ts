import { DefaultState } from "koa";
import { ICustomContext } from "../types";
import Router from "koa-router";

const userRouter = new Router<DefaultState, ICustomContext>({
  prefix: "/user",
});

userRouter.get("/", async (ctx, next) => {
  ctx.body = "Lucas";
});

userRouter.post("/", async (ctx, next) => {
  let username = ctx.request.body.username;
  ctx.body = {
    username,
  };
});

export default userRouter;
