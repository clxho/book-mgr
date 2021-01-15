// 创建邀请码中间件
const Router = require('@koa/router')
const mongoose = require('mongoose')
const { v4 : uuidv4 } = require ('uuid');

const InviteCode = mongoose.model('InviteCode')

const router = new Router({
  prefix: '/invite'
})

router.get('/add', async (ctx) => {
  const code = new InviteCode({
    code: uuidv4(),
    user: ''
  })
  const res = await code.save()

  ctx.body = {
    code: 1,
    data: res,
    msg: '邀请码创建成功'
  }
})

module.exports = router