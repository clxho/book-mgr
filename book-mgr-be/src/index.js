const koa = require('koa')
// 导入数据库连接
const dbconnect = require('./db/index')
// 导入跨域
const cors = require('@koa/cors')
const koabody = require('koa-body')
// 导入注册中间件
const authRouter = require('./routers/auth/index') 
const codeRouter = require('./routers/invite-code/index') 


const app = new koa()

// 数据库连接成功后，完成中间件的功能
dbconnect().then(() => {
  // 允许跨域
  app.use(cors())
  app.use(koabody())
  // 注册中间件
  app.use(authRouter.routes())
  app.use(codeRouter.routes())

  app.listen(3000, () => {
    console.log('服务器连接成功');
  })
})