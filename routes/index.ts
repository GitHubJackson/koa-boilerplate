import { DefaultState } from "koa";
import { ICustomContext } from "../types";
import Router from "koa-router";
import fs from "fs";
import path from "path";
import send from "koa-send";

const homeRouter = new Router<DefaultState, ICustomContext>({
  prefix: "/home",
});

homeRouter.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

homeRouter.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

homeRouter.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
});

// 下载文件
homeRouter.get("/download/:filename", async (ctx, next) => {
  let filename = ctx.params.filename;
  let filePath = `./static/download/${filename}`;
  // mime type, active the download window in browser
  ctx.attachment(filePath);
  await send(ctx, filePath);
  console.log("download successfully.");
});

// 上传文件
function saveFile(file) {
  const reader = fs.createReadStream(file.path);
  let filePath = path.join(__dirname, "/static/upload/") + `/${file.name}`;
  const upStream = fs.createWriteStream(filePath);
  reader.pipe(upStream);
}

homeRouter.post("/upload", async (ctx, next) => {
  // console.log(ctx.request.files);
  const files = ctx.request.files.file;
  if (files.length > 1) {
    for (let file of files) {
      saveFile(file);
    }
  } else if (files) {
    saveFile(files);
  }
  ctx.body = "Upload successfully.";
});

export default homeRouter;
