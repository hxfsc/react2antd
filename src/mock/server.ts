const fs = require("fs")
const util = require("util")
const Koa = require("koa")
const Mock = require("mockjs")

const app = new Koa()
const path = require("path")

const readFile = util.promisify(fs.readFile)

app.use(async (ctx, next) => {
  await next()
  const url = ctx.url
  const result = await readFile(path.resolve(__dirname, `./data/${url}.json`))
  if (result) {
    const data = Mock.mock(JSON.parse(result))
    ctx.body = data
  }
})

app.listen(9001)
