const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router");
const koaBody  = require("koa-body");
const views = require("koa-views");
const fs = require("fs");

let app = new Koa();

app.use(views(__dirname+"/views"), {
  extension: "html"
});

app.use(koaBody({
    multipart:true
}));
app.use(static(__dirname+"/static"));

let router = new Router();

router.post("/upload",ctx=>{
  let fileData =  fs.readFileSync(ctx.request.files.img.path);
  fs.writeFileSync("static/imgs/"+ ctx.request.files.img.name, fileData);
  ctx.body = "请求成功";
});
router.get("/index",async ctx=>{
  await ctx.render("./index.html");
});
router.get("/",async ctx=>{
  ctx.redirect('/index');
});

app.use(router.routes());
app.listen(8888);